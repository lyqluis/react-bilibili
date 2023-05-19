export const getStore = (key, defaultVal = {}) => {
  const val = localStorage.getItem(key)
  console.log('get localstorage', val)
  if (val) {
    return JSON.parse(val)
  } else {
    return setStore(key, defaultVal)
  }
}

export const setStore = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val))
  return val
}

export const setHistoryKeywords = (val = []) => setStore('history_search', val)

export const getHistoryKeywords = () => getStore('history_search')
