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

export const isDef = val => {
  if (Array.isArray(val)) return !!val.length
  if (typeof val === 'object') return !!Reflect.ownKeys(val).length
  return val !== null && val !== undefined
}

const formatDate = (month, date) => {
  const now = new Date()
  const nowMonth = now.getMonth() + 1
  const nowDate = now.getDate()
  if (nowMonth === parseInt(month) && nowDate === parseInt(date)) {
    return `今天`
  } else if (nowMonth === parseInt(month) && nowDate === parseInt(date) + 1) {
    return `昨天`
  }
  return `${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`
}

const dayReg = /\d*\/(\d*)\/(\d*) (\d*):(\d*)/
export const parseDate = time => {
  const d = new Date(time * 1000)
  const str = d.toLocaleString()
  const res = str.match(dayReg)
  const [month, date, hour, min] = [res[1], res[2], res[3], res[4]]
  const formatedDate = formatDate(month, date)

  return `${formatedDate} ${hour}:${min}` // mm-dd hh:mm
}

export const PAGE_SIZE = 5

export const isLongPic = pic => {
  if (!pic) return
  const { img_width: width, img_height: height } = pic
  return height / width >= 2
}