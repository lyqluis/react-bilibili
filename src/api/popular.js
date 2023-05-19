import axios from './index'

/**
 * @func: 热门
 * @param {Number} pn page size
 * @param {Number} ps page number
 * @return {Object} data.list
 */
export const getPopular = (pn = 1, ps = 20) => {
  console.log('axios page', pn)
  return axios({
    method: 'get',
    url: '/popular',
    params: {
      ps,
      pn
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 往期每周必看
 * @return {*}
 */
export const getAllWeekly = () => {
  return axios({
    method: 'get',
    url: '/weeklylist',
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 每周必看
 * 先从往期中获取最新一期的期号
 * @param {Number} number
 * @return {*}
 */
export const getWeekly = (number) => {
  return axios({
    method: 'get',
    url: '/weekly',
    params: { number }
  }).catch((err) => console.log("error", err))
}
