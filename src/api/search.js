import axios from './index'

/**
 * @func: 搜索结果
 * @param {Number} keyword search word
 * @return {Object} data.list
 */
export const getSearch = (keyword) => {
  return axios({
    method: 'get',
    url: '/search',
    params: {
      keyword
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 搜索提示
 * @param {Number} keyword search word
 * - main_ver, {String}, optional,	v1,	固定为 v1
 * - highlight,	{String},	optional, 任意，有此项开启关键词高亮标签
 * @return {Object} 包含建议对象的对象（不是数组）
 */
export const getSearchSuggestion = (keyword) => {
  return axios({
    method: 'get',
    url: '/searchsuggest',
    params: {
      keyword
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 热搜
 * @return {Object} data.list
 */
export const getHotSearch = () => {
  return axios({
    method: 'get',
    url: '/hotsearchkeyword',
  }).catch((err) => console.log("error", err))
}

/**
 * @func: search placeholder
 * @return {Object} data.list
 */
export const getSearchpPlaceholder = () => {
  return axios({
    method: 'get',
    url: '/searchplaceholder',
  }).catch((err) => console.log("error", err))
}
