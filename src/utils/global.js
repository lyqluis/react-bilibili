export const round10k = num =>
  num > 9999 ? (num / 10000).toFixed(1) + '万' : num


export const deduplication = (list1, list2, key) => {
  let isDuplicated, start = 0, l2 = list2.slice()
  for (let i = l2.length - 1; i >= 0; i--) {
    const temp = l2[i]
    const list1Index = list1.findIndex(item => item[key] === temp[key])
    if (list1Index > -1) {
      l2.length--
      isDuplicated = true
    } else {
      break
    }
  }
  for (let i = 0, len = l2.length; i < len; i++) {
    const temp = l2[i]
    const list1Index = list1.findIndex(item => item[key] === temp[key])
    if (list1Index > -1) {
      continue
    } else {
      start = i
      break
    }
  }
  return { data: [...list1, ...l2.slice(start)], isDuplicated }
}

const canScrollReg = /scroll|auto/i
export const getScroller = (el, root = window) => {
  let node = el

  while (node && node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === 1 && node !== root) {
    const { overflowY } = window.getComputedStyle(el)
    if (canScrollReg.test(overflowY)) return node
    node = node.parentNode
  }

  return root
}

const durationReg = /(\d*):(\d*)/
export const formatDuration = duration => {
  if (durationReg.test(duration)) return duration
  const min = parseInt(duration / 60)
  const second = parseInt((duration - min * 60) % 60)
  return `${min}:${second < 10 ? '0' + second : second}`
}