const debounce = (fn, wait, options) => {
	let timer
	let ctx
	let lastArgs
	let lastCallTime
	let lastInvokeTime = 0
	let maxing = false
	let maxWait
	let leading = false
	let trailing = true
	let result

	// handle options
	leading = options?.leading
	maxing = "maxWait" in options
	maxWait = maxing ? Math.max(+options.maxWait, wait) : maxWait
	trailing = "trailing" in options ? options.trailing : trailing

	function cancel() {
		if (timer === undefined) clearTimeout(timer)

		lastInvokeTime = 0
		lastArgs = lastCallTime = ctx = lastArgs = undefined
	}

	function startTimer(wait) {
		return setTimeout(() => {
			timeExpired()
		}, wait)
	}

	function timeExpired() {
		const time = Date.now()

		if (shouldInvoke(time)) {
			return trailingEdge(time)
		}

		timer = startTimer(remainingWait(time))
		return
	}

	function trailingEdge(time) {
		timer = undefined

		if (trailing && lastArgs) {
			return invokeFn(time)
		}

		lastArgs = ctx = undefined
		return result
	}

	function remainingWait(time) {
		const timeSinceLastCall = time - lastCallTime
		const timeSinceLastInvoke = time - lastInvokeTime
		const waitRemain = wait - timeSinceLastCall
		const maxWaitRemain = maxWait - timeSinceLastInvoke

		return maxing ? Math.min(waitRemain, maxWaitRemain) : waitRemain
	}

	function invokeFn(time) {
		const args = lastArgs
		const context = ctx
		lastArgs = ctx = undefined
		lastInvokeTime = time

		result = fn.apply(context, args)
		return result
	}

	function shouldInvoke(time) {
		const timeSinceLastCall = time - lastCallTime
		const timeSinceLastInvoke = time - lastInvokeTime

		return (
			lastCallTime === undefined ||
			timeSinceLastCall >= wait ||
			(maxing && timeSinceLastInvoke >= maxWait)
		)
	}

	function leadingEdge(time) {
		lastInvokeTime = time
		timer = startTimer(wait)
		return leading ? invokeFn(time) : result
	}

	function debounced(...args) {
		const time = Date.now()
		const isInvoking = shouldInvoke(time)

		ctx = this
		lastCallTime = time
		lastArgs = args

		if (isInvoking) {
			// first time
			if (timer === undefined) {
				return leadingEdge(lastCallTime)
			}
			//
			if (maxing) {
				timer = startTimer(wait)
				return invokeFn(lastCallTime)
			}
		}
		// reset timer
		// cause if leading is true, only invoke in the first time
		if (timer === undefined) {
			timer = startTimer(wait)
		}

		return result
	}

	debounced.cancel = cancel

	return debounced
}

const throttle = (fn, wait, options) => {
	let leading = options?.leading ?? true
	let trailing = options?.trailing ?? true

	return debounce(fn, wait, {
		leading,
		trailing,
		maxWait: wait,
	})
}

export { debounce, throttle }
