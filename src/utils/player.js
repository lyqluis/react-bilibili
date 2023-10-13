import { getMediaUrl } from "../api/video"
import { isCodecSupported } from "./global"
import { SourceBuffer } from "./sourceBuffer"

export default class Player {
	constructor(videoEl, bvid) {
		this.el = videoEl
		this.bvid = bvid
		this.url = getMediaUrl(this.bvid)
		this.mediaSource = new MediaSource()
		this.bufferTime = 2

		this.mediaInfo = {
			video: null,
			audio: null,
			playInfo: null,
		}
		this.buffers = []
		this.removeBuffers = {
			video: [],
			audio: [],
		}
		this.playing = false
		this.seeking = false
		// bind this
		this.e = {
			onSourceOpen: this.onSourceOpen.bind(this),
			onSeeking: this.onSeeking.bind(this),
			onTimeUpdate: this.onTimeUpdate.bind(this),
		}
	}

	init({ videoInfo, audioInfo, playInfo }) {
		// 视频格式和编码信息，主要为判断浏览器是否支持视频格式，但如果信息和视频不符可能会报错
		const videoMimeCodec =
			(videoInfo.mimeCodec = `${videoInfo.mimeType}; codecs="${videoInfo.codecs}"`)
		const audioMimeCodec =
			(audioInfo.mimeCodec = `${audioInfo.mimeType}; codecs="${audioInfo.codecs}"`)

		this.mediaInfo.video = videoInfo
		this.mediaInfo.audio = audioInfo
		this.mediaInfo.playInfo = playInfo
		console.log(playInfo)

		// check if browser support the codec
		if (!isCodecSupported(videoMimeCodec) && !isCodecSupported(audioMimeCodec))
			return

		// mount <video>'s src to mediaSuource as a Blob URL
		if (!this.el || !this.mediaSource) return
		this.el.src = URL.createObjectURL(this.mediaSource)
		this.mediaSource.addEventListener("sourceopen", this.e.onSourceOpen)
	}

	onSourceOpen() {
		// TODO combine audio & video
		console.log("on source open", this)
		const videoBuffer = new SourceBuffer(
			this.mediaInfo.video,
			this.mediaSource,
			this.el,
			this.url
		)
		const audioBuffer = new SourceBuffer(
			this.mediaInfo.audio,
			this.mediaSource,
			this.el,
			this.url
		)
		this.buffers.push(videoBuffer, audioBuffer)

		this.el.addEventListener("seeking", this.e.onSeeking)
		this.el.addEventListener("timeupdate", this.e.onTimeUpdate)
	}

	onTimeUpdate(e) {
		console.log("timeupdate")
		if (this.seeking) return
		const { currentTime } = e.target
		// todo throttle
		this.buffers.map((sourceBuffer) => {
			const { end } = sourceBuffer.getBufferRange()
			if (end - currentTime < this.bufferTime) {
				// laod more meadia's source buffer
				sourceBuffer.loadMoreBuffer()
			}
		})
	}

	onSeeking(e) {
		console.log("seeking")
		this.seeking = true
		const { currentTime } = e.target
		this.buffers.map((sourceBuffer) => {
			const { start, end } = sourceBuffer.getBufferRange()
			if (currentTime < start || currentTime >= end) {
				sourceBuffer.changeBuffer(currentTime)
			}
		})
		this.seeking = false
	}
}
