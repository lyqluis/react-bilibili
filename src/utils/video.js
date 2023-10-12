import { legacy_createStore } from "redux"
import axios from "../api"
import { clamp } from "./global"

// todo video and audio use this script together,
// but i want to use it seperately
const REG_CONTENT_TOTAL_LENGTH = /\/(\d*)/

let mediaSourceBuffer
let mediaBuffered = 0
let contentTotalLength

export const addSource = (
	mediaInfo,
	mediaSource,
	videoEl,
	mediaUrl, // frontend to backend's url
	sidx,
	startTime = 0, // buffer start time
	bufferTime
) => {
	const mediaSourceBuffer = mediaSource.addSourceBuffer(mediaInfo.mimeCodec)

	let inited
	let bufferSegmentIndex = findSegmentIndex(startTime, sidx)
	const startRangeIndex = bufferSegmentIndex

	async function addNextMedia(url, rangeIndex = 0, sidx) {
		let range = rangeIndex
		if (typeof rangeIndex === "number") {
			const currentSegment = sidx[rangeIndex]
			range = currentSegment.range
		}
		console.log("params: range", rangeIndex, range)

		const res = await axios({
			url,
			method: "post",
			headers: {
				range: `bytes=${range}`,
				// pragma: "no-cache",
			},
			data: {
				baseUrl: mediaInfo.baseUrl, // send to backend to fetch real data
			},
			responseType: "arraybuffer", // MUST BE SURE response type is 'arraybuffer'
		})
		console.log("fetch buffer", range, typeof res, res)

		if (
			typeof rangeIndex === "number" &&
			bufferSegmentIndex < sidx.length - 1
		) {
			bufferSegmentIndex = rangeIndex + 1
		}
		// inited = true

		// todo remove content-range from backend
		// console.log("content total length init", range, contentTotalLength)
		// if (!contentTotalLength) {
		// 	//-- todo set content-range
		// 	const match = res.headers["content-range"].match(REG_CONTENT_TOTAL_LENGTH)
		// 	contentTotalLength = match[1]
		// 	console.log("content total length", contentTotalLength)
		// }

		// //-- todo no use to get headers[content-length]
		// // last segmenet
		// // when res.headers.contentLength < current range
		// // means that this is the last segment of the video
		// // caculate current range
		// console.log("res.headers", res.byteLength)
		// if (res.headers["content-length"] < dis) {
		// 	isLastSegement = true
		// }

		// 往容器中添加请求到的数据，不会影响当下的视频播放
		mediaSourceBuffer.appendBuffer(res.data)
	}

	mediaSourceBuffer.addEventListener("updateend", async (e) => {
		console.log(mediaInfo.mimeType, "buffer update end", mediaSourceBuffer, e)
		const isLastSegement = bufferSegmentIndex >= sidx.length - 1

		// if (isLastSegement) {
		// 	// 全部视频片段加载完关闭容器
		// 	mediaSource.endOfStream()
		// 	URL.revokeObjectURL(videoEl.src) // Blob URL 已经使用并加载，不需要再次使用的话可以释放掉
		// 	return
		// }

		if (!inited) {
			inited = true
			await addNextMedia(mediaUrl, "0-1813", sidx)
			return
		}

		// addNextMedia(mediaUrl, bufferSegmentIndex, sidx)
		if (!mediaSourceBuffer.buffered.length) {
			await addNextMedia(mediaUrl, bufferSegmentIndex, sidx)
			return
		}

		// if (bufferSegmentIndex == 1) {
		// 	await addNextMedia(mediaUrl, 5, startTime, sidx)
		// }

		// // console.log(mediaSourceBuffer.buffered.end(0), currentRange)

		// const bufferEnd = (mediaBuffered = mediaSourceBuffer.buffered.end(0))
		// const { currentTime } = videoEl
		// const currentSegmentIndex = findSegmentIndex(currentTime, sidx)

		// if (!isLastSegement && bufferSegmentIndex - currentSegmentIndex < 2) {
		// 	await addNextMedia(mediaUrl, bufferSegmentIndex)
		// 	return
		// }

		// // console.log("can play")
		// videoEl.paused && videoEl.play()
	})

	videoEl.addEventListener("error", () => {
		console.error(
			`Error ${videoEl.error.code}; details: ${videoEl.error.message}`
		)
	})

	// videoEl.addEventListener("timeupdate", async (e) => {
	// 	const isLastSegement = bufferSegmentIndex >= sidx.length - 1

	// 	const { currentTime } = videoEl
	// 	const currentSegmentIndex = findSegmentIndex(currentTime, sidx)

	// 	// video buffer
	// 	const buffered = videoEl.buffered
	// 	// const buffered = mediaSourceBuffer.buffered

	// 	if (buffered.length) {
	// 		console.log("video play current time:", currentTime, buffered.end(0))
	// 		const end = buffered.end(0)
	// 		// console.log(mediaSource.activeSourceBuffers)

	// 		if (!isLastSegement && bufferSegmentIndex - currentSegmentIndex < 2) {
	// 			if (videoEl.paused) return
	// 			videoEl.pause()
	// 			await addNextMedia(mediaUrl)
	// 		}
	// 	}
	// })

	// todo
	videoEl.addEventListener("seeking", (e) => {
		console.log("🔍 seeking", e)
		// if out of buffer, remove mediasource buffer
		inited = false
		mediaSourceBuffer.remove(0, mediaSourceBuffer.buffered.end(0))
		const { currentTime } = e.target
		bufferSegmentIndex = findSegmentIndex(currentTime, sidx)
		// startRangeIndex = bufferSegmentIndex
		// addNextMedia(mediaUrl, bufferSegmentIndex, sidx)
		// addNextMedia(mediaUrl, "0-1813", sidx)
		// add new buffer
	})
	// // only seeked in the buffer can fire this event
	// videoEl.addEventListener("seeked", (e) => {
	// 	console.log("seeked", e)
	// })

	//-- range length, 1000000 => 18s
	// 加载初始视频
	inited = true
	const { segment_base } = mediaInfo
	// addNextMedia(mediaUrl, segment_base.initialization, startTime, sidx)
	// addNextMedia(mediaUrl, segment_base.index_range, sidx)
	addNextMedia(mediaUrl, "0-1813", sidx)
	// addNextMedia(mediaUrl, 0, startTime, sidx)
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

export const getInitBuffer = async (url, mediaInfo) => {
	const { baseUrl, segment_base } = mediaInfo
	// const range = `bytes=${segment_base.initialization}`
	const range = `bytes=${segment_base.index_range}`

	const res = await axios({
		url,
		method: "post",
		headers: {
			range,
		},
		data: {
			baseUrl,
		},
		responseType: "arraybuffer", // 数据请求类型一定要是 arraybuffer
	})
	console.log("get init buffer", res)

	const buffer = res.data
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

	const sidxList = sidxBox.entries.map((entry) => {
		const start = rangeIndex
		const end = parseInt(rangeIndex) + entry.referenced_size
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
	// const [, start, end] = range.match(/(\d*)-(\d*)/)
	// const dis = end - start + 1
	// currentRange = parseInt(end) + 1

	// console.log("content total length init", range, contentTotalLength)
	// if (!contentTotalLength) {
	// 	// todo set content-range
	// 	const match = res.headers["content-range"].match(REG_CONTENT_TOTAL_LENGTH)
	// 	contentTotalLength = match[1]
	// 	console.log("content total length", contentTotalLength)
	// }

	// // last segmenet
	// // when res.headers.contentLength < current range
	// // means that this is the last segment of the video
	// // caculate current range
	// console.log("res.headers", res.byteLength)
	// if (res.headers["content-length"] < dis) {
	// 	isLastSegement = true
	// }
	// // 往容器中添加请求到的数据，不会影响当下的视频播放。
	// mediaSourceBuffer.appendBuffer(res.data)
}

const findSegmentIndex = (time, sidx) => {
	const currentSegmentIndex =
		sidx.findIndex((segment) => segment.startTime > time) - 1
	return clamp(currentSegmentIndex, 0, sidx.length - 1)
}
