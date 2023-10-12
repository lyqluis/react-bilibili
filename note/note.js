// // event listener
// // when player progress changed, call function de
// r.on(p.PLAYBACK_PROGRESS, de, this),
// 	r.on(p.PLAYBACK_TIME_UPDATED, de, this),
// 	// function de
// 	function de() {
// 		// V - boolean
// 		V || (ge(), ve())
// 	}
// // function ge
// function ge() {
// 	var e, t
// 	//? f: player instance
// 	f &&
// 		((e = // * get new progress time, default 0
// 			(function () {
// 				var e = f.getTime() // get new progress time
// 				if (U) {
// 					var t = me()
// 					t && t.length && (e = Math.max(t.start(0), U))
// 				}
// 				return e
// 			})() || 0),
// 		// 计算 b：bufferlevel
// 		(b = null === (t = ye(e, void 0)) ? 0 : t.end - e),
// 		// *  trigger buffer_level_updated with param obejct
// 		r.trigger(p.BUFFER_LEVEL_UPDATED, {
// 			sender: m,
// 			bufferLevel: b,
// 		}),
// 		Ee())
// }
// // todo buffer_level_updated
// // trigger event[bufferLevelUpdated] queue's all functions
// // event bus
// function u() {
// 	var e = {}
// 	function t(t, r, n) {
// 		var i = -1
// 		return e[t]
// 			? (e[t].some(function (e, t) {
// 					if (e && e.callback === r && (!n || n === e.scope)) return (i = t), !0
// 			  }),
// 			  i)
// 			: i
// 	}
// 	return {
// 		on: function (r, n, i) {
// 			var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
// 			if (!r) throw new Error("event type cannot be null or undefined")
// 			if (!n || "function" != typeof n)
// 				throw new Error("listener must be a function: " + n)
// 			if (!(t(r, n, i) >= 0)) {
// 				e[r] = e[r] || []
// 				var a = { callback: n, scope: i, priority: o },
// 					s = e[r].some(function (t, n) {
// 						if (t && o > t.priority) return e[r].splice(n, 0, a), !0
// 					})
// 				s || e[r].push(a)
// 			}
// 		},
// 		off: function (r, n, i) {
// 			if (r && n && e[r]) {
// 				var o = t(r, n, i)
// 				o < 0 || (e[r][o] = null)
// 			}
// 		},
// 		trigger: function (t, r) {
// 			if (t && e[t]) {
// 				if ((r = r || {}).hasOwnProperty("type"))
// 					throw new Error("'type' is a reserved word for event dispatching")
// 				;(r.type = t),
// 					(e[t] = e[t].filter(function (e) {
// 						return e
// 					})),
// 					e[t].forEach(function (e) {
// 						return e && e.callback.call(e.scope, r)
// 					})
// 			}
// 		},
// 		reset: function () {
// 			e = {}
// 		},
// 	}
// }
// // event[bufferLevelUpdated] queue has functions:
// // - Me(e) does nothing at the moment
// // - L(e)?
// // - v(e) does nothing at the moment
// // - Ae(e) set audio's seek able, setSeekable(x, e.value.range.start, e.value.range.end)
// //?-
// // function Ee()
// function Ee() {
// 	;("audio" !== h && "video" !== h) ||
// 		(B &&
// 			!E &&
// 			f &&
// 			f.getTimeToStreamEnd() - b < Oe &&
// 			((B = !1),
// 			(E = !0),
// 			v(
// 				"[BufferController][" +
// 					h +
// 					"] checkIfSufficientBuffer trigger BUFFERING_COMPLETED"
// 			),
// 			r.trigger(p.BUFFERING_COMPLETED, {
// 				sender: m,
// 				streamInfo: y.getStreamInfo(),
// 			})),
// 		b < Oe && !E ? Se(Ie) : (E || b >= o.getStableBufferTime()) && Se(De))
// }

// var a = void 0;
// v.getBufferController().getIsPruningInProgress() || !(a = k.execute(v, o)) && r.manifestInfo && r.manifestInfo.isDynamic && E("getNextFragment - " + m + " - Playing at the bleeding live edge and frag is not available yet"),
// a ? (E("ScheduleController - " + m + " - getNextFragment - request is " + a.url),
// "video" === m && f.getAutoSwitchBitrateFor(m) && Object.keys(q).forEach((function(e) {
// -1 !== q[e] && (a.isSwitchingQn = !0)
// }
// )),
// b.executeRequest(a)) : (J(!1),

// e.getBufferController().getRangeAt(seektime)
// // function ye
// //...
// // get index range & init range
// n.getFragmentRequestForTime(e, i/* media info */, c, {
//   keepIdx: !u
// }
// // choose matched segements from media info
// a.getSegmentRequestForTime(i/* media info, including range */, r,/* current time */ n/* {keepIndex: false} */)

function et() {
	var e = this.context,
		t = d(e).getInstance(),
		r = void 0,
		i = void 0,
		o = void 0,
		a = void 0,
		s = void 0,
		u = void 0,
		l = void 0,
		c = void 0,
		f = void 0,
		h = void 0,
		y = void 0,
		m = void 0,
		g = void 0,
		v = void 0,
		_ = void 0,
		E = void 0,
		b = []
	function S() {
		return a
	}
	function T() {
		return u
	}
	function A() {
		;(i = null),
			(o = -1),
			(a = !0),
			(s = []),
			(l = null),
			(f = null),
			(h = null),
			(y = null),
			(m = null),
			(g = null),
			(v = null)
	}
	function R() {
		var e = new Date(),
			t = T(),
			r = 1e3 * f.getTime()
		h.addRepresentationSwitch(t.adaptation.type, e, r, t.id)
	}
	function P() {
		var e = _.getStreamInfo(),
			t = e ? e.manifestInfo : null,
			r = t ? t.isDynamic : null,
			n = m.calcSegmentAvailabilityRange(u, r)
		h.addDVRInfo(_.getType(), f.getTime(), t, n)
	}
	function D(e) {
		// ## where is `s` from?
		return s[e]
	}
	function I(e) {
		return s.indexOf(e)
	}
	function O(e) {
		var n = e
		;(a = !1),
			t.trigger(p.AST_IN_FUTURE, { delay: n }),
			setTimeout(function () {
				if (!S()) {
					;(a = !0),
						t.trigger(p.DATA_UPDATE_STARTED, { sender: r }),
						s.forEach(function (e) {
							e.segmentAvailabilityRange = null
						})
					for (var e = 0; e < s.length; e++) c.updateRepresentation(s[e], !0)
				}
			}, n)
	}
	function C(e) {
		if (e.sender.getStreamProcessor() === _ && S()) {
			var r = e.representation,
				o = h.getMetricsFor(n.STREAM),
				c = T().adaptation.type,
				d = h.getMetricsFor(T().adaptation.type),
				y = v.getCurrentManifestUpdate(o),
				m = !1,
				g = 0,
				E = void 0,
				b = void 0
			if (
				r.adaptation.period.mpd.manifest.type === Xe.DYNAMIC &&
				!r.adaptation.period.mpd.manifest.ignorePostponeTimePeriod
			) {
				var A =
					r.segmentAvailabilityRange.end - r.segmentAvailabilityRange.start
				g =
					1e3 *
					(f.computeLiveDelay(
						u.segmentDuration,
						_.getStreamInfo().manifestInfo.DVRWindowSize
					) -
						A)
			}
			if (g > 0)
				return (
					P(),
					O(g),
					(b = new w(1, "Segments update failed", null)),
					void t.trigger(p.DATA_UPDATE_COMPLETED, {
						sender: this,
						data: i,
						currentRepresentation: u,
						error: b,
					})
				)
			if (y) {
				for (var D = 0; D < y.representationInfo.length; D++)
					if (
						(E = y.representationInfo[D]).index === r.index &&
						E.mediaType === _.getType()
					) {
						m = !0
						break
					}
				m ||
					h.addManifestUpdateRepresentationInfo(
						y,
						r.id,
						r.index,
						r.adaptation.period.index,
						_.getType(),
						r.presentationTimeOffset,
						r.startNumber,
						r.segmentInfoType
					)
			}
			;(function (e) {
				var t = l.getQualityFor(e),
					r = _.getStreamInfo(),
					n = l.getTopQualityIndexFor(e, r.id),
					i = l.getMinAllowedIndexFor(e)
				void 0 !== i && t < i && (t = i), t > n && (t = n)
				for (var o = t; o < 1; o++) {
					var a = s[o].segmentInfoType
					if (
						null === s[o].segmentAvailabilityRange ||
						!$e.hasInitialization(s[o]) ||
						((a === Xe.SEGMENT_BASE || a === Xe.BASE_URL) && !s[o].segments)
					)
						return !1
				}
				return !0
			})(c) &&
				((a = !1),
				l.setPlaybackQuality(_.getType(), _.getStreamInfo(), I(u)),
				h.updateManifestUpdateInfo(y, {
					latency: u.segmentAvailabilityRange.end - f.getTime(),
				}),
				v.getCurrentRepresentationSwitch(d) || R(),
				t.trigger(p.DATA_UPDATE_COMPLETED, {
					sender: this,
					data: i,
					currentRepresentation: u,
				}))
		}
	}
	function N(e) {
		e.isDynamic &&
			(function (e) {
				for (var t = void 0, r = 0, n = s.length; r < n; r++)
					(t = s[r]).segmentAvailabilityRange = m.calcSegmentAvailabilityRange(
						t,
						e
					)
			})(e.isDynamic)
	}
	function L(e) {
		e.sender.getStreamProcessor() === _ &&
			(E.getValue().doNotUpdateDVRWindowOnBufferUpdated || P())
	}
	function k(e) {
		if (
			e.mediaType === _.getType() &&
			_.getStreamInfo().id === e.streamInfo.id &&
			e.oldQuality !== e.newQuality
		) {
			var t = e.newQuality
			b[t] || ((b[t] = !0), c.updateRepresentation(s[t], !0)),
				(u = D(e.newQuality))
			var r = l.getThroughputHistory().getAverageThroughput(e.mediaType)
			isNaN(r) || y.setSavedBitrateSettings(e.mediaType, r), R()
		}
	}
	function M(e) {
		if (e.newDuration) {
			var t = T()
			t && t.adaptation.period && (t.adaptation.period.duration = e.newDuration)
		}
	}
	return (
		(r = {
			initialize: function () {
				c = _.getIndexHandler()
			},
			setConfig: function (e) {
				e.abrController && (l = e.abrController),
					e.domStorage && (y = e.domStorage),
					e.metricsModel && (h = e.metricsModel),
					e.dashMetrics && (v = e.dashMetrics),
					e.dashManifestModel && (g = e.dashManifestModel),
					e.playbackController && (f = e.playbackController),
					e.timelineConverter && (m = e.timelineConverter),
					e.manifestModel && (E = e.manifestModel),
					e.streamProcessor && (_ = e.streamProcessor)
			},
			getData: function () {
				return i
			},
			getDataIndex: function () {
				return o
			},
			isUpdating: S,
			updateData: function (e, r, d) {
				var f = _.getStreamInfo(),
					h = l.getTopQualityIndexFor(d, f.id),
					y = l.getMinAllowedIndexFor(d),
					m = void 0
				if (
					((a = !0),
					t.trigger(p.DATA_UPDATE_STARTED, { sender: this }),
					(s = (function (e) {
						return (
							(o = g.getIndexForAdaptation(
								i,
								e.period.mpd.manifest,
								e.period.index
							)),
							g.getRepresentationsForAdaptation(e)
						)
					})(r)),
					(null !== i && i.id == e.id) ||
						d === n.FRAGMENTED_TEXT ||
						l.getThroughputHistory().getAverageThroughput(d) ||
						l.getInitialBitrateFor(d, f),
					(m = l.getQualityFor(d)),
					void 0 !== y && m < y && (m = y),
					m > h && (m = h),
					(u = D(m)),
					(i = e),
					d !== n.VIDEO && d !== n.AUDIO && d !== n.FRAGMENTED_TEXT)
				)
					return (
						(a = !1),
						void t.trigger(p.DATA_UPDATE_COMPLETED, {
							sender: this,
							data: i,
							currentRepresentation: u,
						})
					)
				;((b = [])[m] = !0), c.updateRepresentation(s[m], !0)
			},
			getStreamProcessor: function () {
				return _
			},
			getCurrentRepresentation: T,
			getRepresentationForQuality: D,
			getQualityForRepresentationId: function (e) {
				return I(
					s.find(function (t) {
						return t.id === e
					})
				)
			},
			reset: function () {
				t.off(p.QUALITY_CHANGE_REQUESTED, k, r),
					t.off(p.REPRESENTATION_UPDATED, C, r),
					t.off(p.WALLCLOCK_TIME_UPDATED, N, r),
					t.off(p.BUFFER_LEVEL_UPDATED, L, r),
					t.off(p.MANIFEST_VALIDITY_CHANGED, M, r),
					A(),
					(b = [])
			},
		}),
		A(),
		t.on(p.QUALITY_CHANGE_REQUESTED, k, r),
		t.on(p.REPRESENTATION_UPDATED, C, r),
		t.on(p.WALLCLOCK_TIME_UPDATED, N, r),
		t.on(p.BUFFER_LEVEL_UPDATED, L, r),
		t.on(p.MANIFEST_VALIDITY_CHANGED, M, r),
		r
	)
}

// http loader
function Ht() {
	var e = this.context,
		t = g(e).getInstance().log,
		r = d(e).getInstance(),
		n = void 0,
		i = void 0,
		a = void 0,
		s = void 0,
		u = void 0,
		l = void 0,
		c = void 0,
		f = void 0
	function h() {
		if (!f || !f.hasOwnProperty("resolve"))
			throw new Error("setConfig function has to be called previously")
	}
	function m(e) {
		if (e.url) {
			var t = new y()
			return (
				(t.type = e.init ? F.INIT_SEGMENT_TYPE : F.MEDIA_SEGMENT_TYPE),
				(t.url = e.url),
				(t.urls = e.urls),
				(t.range = e.range.start + "-" + e.range.end),
				(t.representationId = e.representationId),
				(t.mediaType = e.mediaType),
				t
			)
		}
	}
	function v(e, t, n) {
		e
			? r.trigger(p.SEGMENTS_LOADED, {
					segments: e,
					representation: t,
					mediaType: n,
			  })
			: r.trigger(p.SEGMENTS_LOADED, {
					segments: null,
					representation: t,
					mediaType: n,
					error: new w(null, "error loading segments", null),
			  })
	}
	return {
		setConfig: function (e) {
			e.baseURLController && (f = e.baseURLController),
				e.metricsModel && (u = e.metricsModel),
				e.mediaPlayerModel && (l = e.mediaPlayerModel),
				e.errHandler && (n = e.errHandler),
				e.videoModel && (i = e.videoModel)
		},
		initialize: function () {
			;(a = be(e).getInstance()),
				(s = bt(e).getInstance()),
				(c = jt(e).create({
					errHandler: n,
					videoModel: i,
					metricsModel: u,
					mediaPlayerModel: l,
					requestModifier: s,
					preloadData: l.getPreloadData(),
				}))
		},
		loadInitialization: function e(n, i) {
			h()
			var o = null,
				s = null,
				u = f.resolve(n.path),
				l = i || {
					init: !0,
					url: u ? u.url : void 0,
					range: { start: 0, end: 1500 },
					searching: !1,
					bytesLoaded: 0,
					bytesToLoad: 1500,
				}
			t("Start searching for initialization.")
			var d = m(l)
			c.load({
				request: d,
				success: function (i) {
					;(l.bytesLoaded = l.range.end),
						(s = a.parse(i)),
						(o = (function (e) {
							var r = e.getBox("ftyp"),
								n = e.getBox("moov"),
								i = null,
								o = void 0,
								a = void 0
							return (
								t("Searching for initialization."),
								n &&
									n.isComplete &&
									((o = r ? r.offset : n.offset),
									(a = n.offset + n.size - 1),
									t("Found the initialization.  Range: " + (i = o + "-" + a))),
								i
							)
						})(s))
							? ((n.range = o),
							  r.trigger(p.INITIALIZATION_LOADED, {
									representation: n,
							  }))
							: ((l.range.end = l.bytesLoaded + l.bytesToLoad), e(n, l))
				},
				error: function () {
					r.trigger(p.INITIALIZATION_LOADED, {
						representation: n,
					})
				},
			}),
				t("Perform init search: " + l.url)
		},
		loadSegments: function e(r, i, s, u, d) {
			if ((h(), s && (void 0 === s.start || void 0 === s.end))) {
				var p = s ? s.toString().split("-") : null
				s = p ? { start: parseFloat(p[0]), end: parseFloat(p[1]) } : null
			}
			;(s.start = 0), (d = d || v)
			var y = null,
				g = null,
				_ = !!s,
				E = f.resolve(r.path),
				b = {
					init: !1,
					url: E ? E.url : void 0,
					urls: E.urls,
					range: _ ? s : { start: 0, end: 1500 },
					searching: !_,
					bytesLoaded: u ? u.bytesLoaded : 0,
					bytesToLoad: 1500,
					representationId: r.id,
					mediaType: r.adaptation.type,
				},
				S = m(b),
				T = function () {
					d(null, r, i)
				}
			c.load({
				request: S,
				success: function (s) {
					if (
						((b.bytesLoaded = b.range.end - b.range.start),
						(y = a.parse(s)),
						(g = y.getBox("sidx")) && g.isComplete)
					) {
						var u = g.references,
							c = void 0,
							f = void 0
						if (
							(null != u && u.length > 0 && (c = 1 === u[0].reference_type), c)
						) {
							t("Initiate multiple SIDX load."),
								(b.range.end = b.range.start + g.size)
							var p = void 0,
								h = void 0,
								m = void 0,
								v = void 0,
								_ = [],
								E = 0,
								S = (g.offset || b.range.start) + g.size,
								w = function (e) {
									e
										? ((_ = _.concat(e)), ++E >= h && d(_, r, i))
										: d(null, r, i)
								}
							for (p = 0, h = u.length; p < h; p++)
								(m = S),
									(v = S + u[p].referenced_size - 1),
									(S += u[p].referenced_size),
									e(r, null, { start: m, end: v }, b, w)
						} else {
							t("Parsing segments from SIDX."),
								(f = (function (e, t) {
									for (
										var r = e.references,
											n = r.length,
											i = e.timescale,
											o = e.earliest_presentation_time,
											a = t.range.start + e.offset + e.first_offset + e.size,
											s = [],
											u = void 0,
											l = void 0,
											c = void 0,
											d = void 0,
											f = 0;
										f < n;
										f++
									)
										(c = r[f].subsegment_duration),
											(d = r[f].referenced_size),
											((u = new it()).duration = c),
											(u.startTime = o),
											(u.timescale = i),
											(l = a + d - 1),
											(u.mediaRange = a + "-" + l),
											s.push(u),
											(o += c),
											(a += d)
									return s
								})(g, b))
							try {
								var A = f[f.length - 1],
									R = (A.duration + A.startTime) / A.timescale
								r.adaptation.period.min
									? (r.adaptation.period.min = Math.min(
											r.adaptation.period.min,
											R
									  ))
									: (r.adaptation.period.min = R)
								var P = l.getCachedDurationOffset("offset")
								;(r.adaptation.period.duration = parseFloat(
									(P + r.adaptation.period.min).toFixed(5)
								)),
									t(
										"Set real min period duration " +
											r.adaptation.period.duration +
											" ( " +
											P +
											" )"
									)
							} catch (e) {
								t("Set real period error " + i)
							}
							d(f, r, i)
						}
					} else
						T(),
							n.mediaSourceError(
								"Error parsing " + i + " response.",
								o.MEDIA_DECODE_ERROR
							)
				},
				error: T,
			}),
				t("Perform SIDX load: " + b.url)
		},
		resetPreloadData: function () {
			c && c.setPreloadData(l.getPreloadData())
		},
		reset: function () {
			c.abort(), (c = null), (n = null), (a = null), (s = null)
		},
	}
}

o.prototype._procField = function (e, t, r) {
	this._parsing
		? (this[e] = this._readField(t, r))
		: this._writeField(t, r, this[e])
}

o.prototype._readField = function (e, t) {
	switch (e) {
		case "uint":
			return this._readUint(t)
		case "int":
			return this._readInt(t)
		case "template":
			return this._readTemplate(t)
		case "string":
			return -1 === t ? this._readTerminatedString() : this._readString(t)
		case "data":
			return this._readData(t)
		case "utf8":
			return this._readUTF8String()
		default:
			return -1
	}
}

o.prototype._readUint = function (e) {
	var t,
		r,
		n = null,
		i = this._cursor.offset - this._raw.byteOffset
	switch (e) {
		case 8:
			n = this._raw.getUint8(i)
			break
		case 16:
			n = this._raw.getUint16(i)
			break
		case 24:
			n = ((t = this._raw.getUint16(i)) << 8) + (r = this._raw.getUint8(i + 2))
			break
		case 32:
			n = this._raw.getUint32(i)
			break
		case 64:
			;(t = this._raw.getUint32(i)),
				(r = this._raw.getUint32(i + 4)),
				(n = t * Math.pow(2, 32) + r)
	}
	// e 右移 3 位，添加到 _cursor.offset 中
	return (this._cursor.offset += e >> 3), n
}

o.prototype._boxProcessors.sidx = function () {
	this._procFullBox(),
		this._procField("reference_ID", "uint", 32),
		this._procField("timescale", "uint", 32),
		this._procField(
			"earliest_presentation_time",
			"uint",
			1 == this.version ? 64 : 32
		),
		this._procField("first_offset", "uint", 1 == this.version ? 64 : 32),
		this._procField("reserved", "uint", 16),
		this._procField("reference_count", "uint", 16),
		this._procEntries("references", this.reference_count, function (e) {
			this._parsing ||
				((e.reference = (1 & e.reference_type) << 31),
				(e.reference |= 2147483647 & e.referenced_size),
				(e.sap = (1 & e.starts_with_SAP) << 31),
				(e.sap |= (3 & e.SAP_type) << 28),
				(e.sap |= 268435455 & e.SAP_delta_time)),
				this._procEntryField(e, "reference", "uint", 32),
				this._procEntryField(e, "subsegment_duration", "uint", 32),
				this._procEntryField(e, "sap", "uint", 32),
				this._parsing &&
					((e.reference_type = (e.reference >> 31) & 1),
					(e.referenced_size = 2147483647 & e.reference),
					(e.starts_with_SAP = (e.sap >> 31) & 1),
					(e.SAP_type = (e.sap >> 28) & 7),
					(e.SAP_delta_time = 268435455 & e.sap))
		})
}
