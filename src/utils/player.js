import { getMediaUrl } from "../api/video"
import { isCodecSupported } from "./global"
import { SourceBuffer } from "./video2"

export default class Player {
	constructor(videoEl, bvid) {
		this.el = videoEl
		this.bvid = bvid
		this.url = getMediaUrl(this.bvid)
		this.mediaSource = new MediaSource()

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
		// todo combine audio & video
		// addSource(
		// 	videoInfo,
		// 	mediaSource.current,
		// 	video.current,
		// 	url,
		// 	0,
		// 	BUFFER_TIME
		// )
		console.log("on source open", this)
		const videoBuffer = new SourceBuffer(
			this.mediaInfo.video,
			this.mediaSource,
			this.el,
			this.url
		)
		this.buffers.push(videoBuffer)

		this.el.addEventListener("seeking", this.e.onSeeking)
		this.el.addEventListener("timeupdate", this.e.onTimeUpdate)
	}

	onTimeUpdate({ target }) {
		// todo throttle
		const { currentTime } = target
	}

	onSeeking(e) {
		console.log("seeking", e)
		this.seeking = true
		const { currentTime } = e.target
		this.buffers.map((sourceBuffer) => sourceBuffer.changeBuffer(currentTime))
		// todo if target is in the buffer
	}
}
