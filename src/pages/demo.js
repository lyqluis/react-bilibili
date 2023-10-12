axios.defaults.withCredentials = true

const video = document.querySelector("video")

const BUFFER_TIME = 5
let videoBuffered = 0
let audioBuffered = 0

// const av = "BV1Yj411671c"
const av = "BV13P41147Gu"
const mediaUrl = `http://localhost:3003/video/${av}`
axios(mediaUrl).then((res) => {
	console.log(res)
	const { videoInfo, audioInfo } = res.data
	// 视频格式和编码信息，主要为判断浏览器是否支持视频格式，但如果信息和视频不符可能会报错
	const videoMimeCodec =
		(videoInfo.mimeCodec = `${videoInfo.mimeType}; codecs="${videoInfo.codecs}"`)
	const audioMimeCodec =
		(audioInfo.mimeCodec = `${audioInfo.mimeType}; codecs="${audioInfo.codecs}"`)

	// check if browser support the codec
	if (!isCodecSupported(videoMimeCodec) && !isCodecSupported(audioMimeCodec))
		return

	const mediaSource = new MediaSource()
	video.src = URL.createObjectURL(mediaSource) // 将 <video> 与 MediaSource 绑定，此处生成一个 Blob URL

	const mediaInfo = { videoInfo, audioInfo }
	mediaSource.addEventListener("sourceopen", () => {
		sourceOpen({ mediaInfo, mediaSource })
	}) // 可以理解为容器打开
})

const isCodecSupported = (codec) => {
	// 浏览器不支持该视频格式
	if (!("MediaSource" in window) || !MediaSource.isTypeSupported(codec)) {
		console.error("Unsupported MIME type or codec: ", codec)
		return false
	}
	console.log("MIME type or codec supported:", codec)
	return true
}

function sourceOpen({ mediaInfo, mediaSource }) {
	const { videoInfo, audioInfo } = mediaInfo
	// todo combine audio & video
	addSource(videoInfo, mediaSource)
	addAudioSource(audioInfo, mediaSource)
	// addSource(videoInfo, mediaSource, video, mediaUrl)
	// addSource(audioInfo, mediaSource, video, mediaUrl)
}

function addSource(mediaInfo, mediaSource, buffered) {
	const videoSourceBuffer = mediaSource.addSourceBuffer(mediaInfo.mimeCodec)

	let isLastSegement
	let currentRange

	async function getNextMedia(url, range, step = 100000) {
		if (!range) {
			range = `${currentRange}-${currentRange + step}`
		}
		console.log("params: range", range)

		const res = await axios({
			url,
			method: "post",
			headers: {
				range: `bytes=${range}`,
				// pragma: "no-cache",
			},
			data: {
				baseUrl: mediaInfo.baseUrl,
			},
			responseType: "arraybuffer", // 数据请求类型一定要是 arraybuffer
		})
		console.log("fetch buffer", range, typeof res, res)

		const [, start, end] = range.match(/(\d*)-(\d*)/)
		const dis = end - start + 1
		currentRange = parseInt(end) + 1

		// last segmenet
		// when res.headers.contentLength < current range
		// means that this is the last segment of the video
		// caculate current range
		if (res.headers["content-length"] < dis) {
			isLastSegement = true
		}
		// 往容器中添加请求到的数据，不会影响当下的视频播放。
		videoSourceBuffer.appendBuffer(res.data)
	}

	videoSourceBuffer.addEventListener("updateend", async () => {
		console.log("video buffer update end")

		if (isLastSegement) {
			// 全部视频片段加载完关闭容器
			mediaSource.endOfStream()
			URL.revokeObjectURL(video.src) // Blob URL 已经使用并加载，不需要再次使用的话可以释放掉
			return
		}

		// if (!isControl || !videoSourceBuffer.buffered.length) {
		if (!videoSourceBuffer.buffered.length) {
			await getNextMedia(mediaUrl)
			return
		}

		console.log(videoSourceBuffer.buffered.end(0))

		const bufferEnd = (videoBuffered = videoSourceBuffer.buffered.end(0))
		const { currentTime } = video
		if (!isLastSegement && bufferEnd - currentTime < BUFFER_TIME) {
			await getNextMedia(mediaUrl)
			return
		}

		// console.log("can play")
		video.paused && video.play()
	})

	video.addEventListener("timeupdate", async () => {
		const { currentTime } = video

		// video buffer
		const buffered = video.buffered

		if (buffered.length > 0) {
			console.log("video play current time:", currentTime, buffered.end(0))
			const end = buffered.end(0)

			if (!isLastSegement && videoBuffered - currentTime < BUFFER_TIME) {
				if (video.paused) return
				video.pause()
				await getNextMedia(mediaUrl)
			}
		}
	})

	// range length, 1000000 => 18s
	//加载初始视频
	getNextMedia(mediaUrl, mediaInfo.segment_base.initialization)
}

function addAudioSource(mediaInfo, mediaSource) {
	const audioSourceBuffer = mediaSource.addSourceBuffer(mediaInfo.mimeCodec)

	let isLastSegement
	let currentRange

	async function getNextMedia(url, range, step = 100000) {
		if (!range) {
			range = `${currentRange}-${currentRange + step}`
		}
		console.log("params: range", range)

		const res = await axios({
			url,
			method: "post",
			headers: {
				range: `bytes=${range}`,
				// pragma: "no-cache",
			},
			data: {
				baseUrl: mediaInfo.baseUrl,
			},
			responseType: "arraybuffer", // 数据请求类型一定要是 arraybuffer
		})
		console.log("fetch buffer", range, typeof res, res)

		const [, start, end] = range.match(/(\d*)-(\d*)/)
		const dis = end - start + 1
		currentRange = parseInt(end) + 1

		// last segmenet
		// when res.headers.contentLength < current range
		// means that this is the last segment of the video
		// caculate current range
		if (res.headers["content-length"] < dis) {
			isLastSegement = true
		}
		// 往容器中添加请求到的数据，不会影响当下的视频播放。
		audioSourceBuffer.appendBuffer(res.data)
	}

	audioSourceBuffer.addEventListener("updateend", async () => {
		console.log("audio buffer update end")
		console.log(audioSourceBuffer.buffered)
		if (isLastSegement) {
			// 全部视频片段加载完关闭容器
			mediaSource.endOfStream()
			URL.revokeObjectURL(video.src) // Blob URL 已经使用并加载，不需要再次使用的话可以释放掉
			return
		}

		// if (!isControl || !audioSourceBuffer.buffered.length) {
		if (!audioSourceBuffer.buffered.length) {
			await getNextMedia(mediaUrl)
			return
		}

		console.log(audioSourceBuffer.buffered.end(0))

		const bufferEnd = (audioBuffered = audioSourceBuffer.buffered.end(0))
		const { currentTime } = video
		if (!isLastSegement && bufferEnd - currentTime < BUFFER_TIME) {
			await getNextMedia(mediaUrl)
			return
		}

		// console.log("can play")
		video.paused && video.play()
	})

	video.addEventListener("timeupdate", async () => {
		const { currentTime } = video

		// video buffer
		const buffered = video.buffered

		if (buffered.length > 0) {
			console.log(
				"audio play current time:",
				currentTime,
				// buffered.end(0)
				audioBuffered
			)
			const end = buffered.end(0)

			if (!isLastSegement && audioBuffered - currentTime < BUFFER_TIME) {
				if (video.paused) return
				video.pause()
				await getNextMedia(mediaUrl)
			}
		}

		// todo audio buffer
		// const audioTrack = video.audioTracks[0] // Assuming there is only one audio track
		// const audioBuffered = audioTrack.buffered

		// if (audioBuffered.length > 0) {
		// 	const end = audioBuffered.end(0)

		// 	if (!isLastSegement && end - currentTime < 5) {
		// 		if (video.paused) return
		// 		video.pause()
		// 		await getNextMedia(mediaUrl)
		// 	}
		// }
	})

	// range length, 1000000 => 18s
	//加载初始视频
	getNextMedia(mediaUrl, mediaInfo.segment_base.initialization)
}
