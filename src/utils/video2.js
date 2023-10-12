import axios from "../api"
import { clamp } from "./global"

export class SourceBuffer {
	constructor(mediaInfo, mediaSource, videoEl, url) {
		this.mediaInfo = mediaInfo
		this.mediaSource = mediaSource
		this.el = videoEl
		this.mediaUrl = url
		this.sourceBuffer = mediaSource.addSourceBuffer(mediaInfo.mimeCodec)
		this.sidx = []
		this.initialData = {}
		this.currentSegmentIndex = 0
		this.inited = false
		this.cleared = true
		this.buffer = 10
		this.seeking = false
		this.queue = []

		this.onSourceBufferUpdateEnd()
		this.init()
		// this.onElSeeking()
		this.el.addEventListener("error", () => {
			console.error(
				`Error ${this.el.error.code}; details: ${this.el.error.message}`
			)
		})
		// todo return
	}

	async init() {
		this.cleared = false
		this.inited = false
		await this.addSegment("initialization")
	}

	clear() {
		const start = this.sourceBuffer.buffered.start(0)
		const end = this.sourceBuffer.buffered.end(0)
		this.cleared = true
		console.log("remove", start, end)
		this.sourceBuffer.remove(0, end)
		this.queue = []
	}

	changeBuffer(playTime) {
		this.currentSegmentIndex = this.findSegmentIndex(playTime)
		this.clear()
		// this.init()
		// this.addSegment(this.currentSegmentIndex)
	}

	onSourceBufferUpdateEnd() {
		this.sourceBuffer.addEventListener("updateend", async () => {
			console.log("source buffer update end", this.sourceBuffer)

			// append initialization
			if (this.cleared) {
				this.init()
				return
			}

			// append sidx box
			if (!this.inited) {
				await this.addSegment("index_range")
				this.inited = true
				return
			}

			if (!this.sourceBuffer.buffered.length) {
				await this.addSegment(this.currentSegmentIndex)
				return
			}

			// const isLastSegement = this.currentSegmentIndex >= sidx.length - 1
			// // buffer
			const { currentTime } = this.el
			const playSegmentIndex = this.findSegmentIndex(currentTime)
			if (this.currentSegmentIndex - playSegmentIndex <= 2) {
				this.addSegment(this.currentSegmentIndex)
			}

			// if (!isLastSegement && this.currentSegmentIndex - currentSegmentIndex < 2) {
			// 	await addNextMedia(mediaUrl, bufferSegmentIndex, startTime, sidx)
			// 	return
			// }
		})
	}

	async addSegment(range = "initialization") {
		// parse range
		const isInit = range === "initialization"
		const isIdx = range === "index_range"

		// (init || idx) && initialData exists
		if (this.initialData[range]) {
			const data = this.initialData[range]
			this.sourceBuffer.appendBuffer(data)
			return
		}

		if (isInit || isIdx) {
			range = this.mediaInfo.segment_base[range]
		} else if (typeof range === "number") {
			range = this.sidx[range].range
		}

		const res = await axios({
			url: this.mediaUrl,
			method: "post",
			headers: {
				range: `bytes=${range}`,
				// pragma: "no-cache",
			},
			data: {
				baseUrl: this.mediaInfo.baseUrl, // send to backend to fetch real data
			},
			responseType: "arraybuffer", // MUST BE SURE response type is 'arraybuffer'
		})
		console.log("fetch buffer", range, typeof res, res)

		// handle segement data
		if (isInit || isIdx) {
			if (isIdx) {
				this.sidx = generateSidxList(res.data, this.mediaInfo.segment_base)
			}
			// this.initialData.push(res.data)
			this.initialData[range] = res.data
		} else {
			this.currentSegmentIndex++
		}

		// 往容器中添加请求到的数据，不会影响当下的视频播放
		this.sourceBuffer.appendBuffer(res.data)
		this.queue.push(range)
		console.log(this.queue)
	}

	findSegmentIndex(time) {
		const currentSegmentIndex =
			this.sidx.findIndex((segment) => segment.startTime > time) - 1
		return clamp(currentSegmentIndex, 0, this.sidx.length - 1)
	}
}

const generateSidxList = (data, segment_base) => {
	const buffer = data
	const initDataView = new DataView(buffer)

	// get sidx box
	let box,
		cursor = 0
	while ((!box || box.type !== "sidx") && cursor < initDataView.byteLength) {
		box = parseBox(initDataView, cursor)
		cursor += box.len
	}
	cursor -= box.len

	// parse sidx box
	box = parseSidx(initDataView, cursor)
	console.log(box)

	// parse entry's timescale, startTime, duration
	const sidxBox = box
	let rangeIndex = parseInt(segment_base.index_range.split("-")[1]) + 1
	let time = 0
	console.log(rangeIndex)
	const sidxList = sidxBox.entries.map((entry) => {
		const start = rangeIndex
		const end = parseInt(rangeIndex) + entry.referenced_size - 1
		entry.range = `${start}-${end}`
		rangeIndex = end + 1
		const timescale = (entry.timescale = box.timescale)
		const duration = (entry.duration = entry.subsegment_duration / timescale)
		entry.startTime = time
		time += duration
		return entry
	})
	console.log(sidxList)
	return sidxList
}

const parseBox = (dataView, offset) => {
	let hex2a = function (hex) {
		var str = ""
		for (var i = 0; i < hex.length; i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
		return str
	}
	let trim1 = function (str) {
		return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
	}
	const box = {}
	// get box size in box header
	box.len = dataView.getUint32(offset)
	offset += 4
	// get box type in box header
	let type = dataView.getInt32(offset)
	box.type = trim1(hex2a(type.toString(16)))
	offset += 4

	console.log(box.type)
	return box
}

/**
* @func: 注意：
	此方法只能解析 sidx -> dash 只需解析 sidx 就行
	// todo 以及 header 里面 size 不等于 1 和 0 的情况 -> 这里需要将来支持一下
	// todo 以及 data 部分 version 为 0 的情况 
* @param {ArrayBuffer} dataView
* @param {Number} offset
* @return {Object} box
*/
const parseSidx = (dataView, offset) => {
	// parse bos header
	const box = parseBox(dataView, offset)
	offset += 8

	box.version = dataView.getUint8(offset)
	offset += 4 // get version
	box.reference_ID = dataView.getUint32(offset)
	offset += 4 // get reference_ID
	box.timescale = dataView.getUint32(offset)
	offset += 4 // timescale
	box.earliest_presentation_time = dataView.getUint32(offset)
	offset += 4 // earliest_presentation_time
	box.first_offset = dataView.getUint32(offset)
	offset += 4 // first_offset
	box.reserved = dataView.getUint16(offset)
	offset += 2 // reserved
	box.reference_count = dataView.getUint16(offset)
	offset += 2 // reference_count
	box.entries = []
	let reference_count = box.reference_count
	while (reference_count--) {
		let entry = {}
		let fourBytes = dataView.getUint32(offset)
		offset += 4
		entry["reference_type"] = (fourBytes >> 31) & 1
		entry["referenced_size"] = fourBytes & 0x7fffffff
		entry["subsegment_duration"] = dataView.getUint32(offset)
		offset += 4
		fourBytes = dataView.getUint32(offset)
		offset += 4
		entry["starts_with_SAP"] = (fourBytes >> 31) & 1
		entry["SAP_type"] = (fourBytes >> 29) & 7
		entry["SAP_delta_time"] = fourBytes & 0x0fffffff
		box.entries.push(entry)
	}
	return box
}
