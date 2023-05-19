import axios from './index'

/**
 * @func: 
 * @param {*} keyword
 * @return {Array} all channels
 */
export const getAllChannels = () => {
  return axios({
    method: 'get',
    url: '/region',
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 
 * @param {Number} rid
 * @param {Number} ps
 * @param {Number} pn
 * @return {*}
 */
export const getChannelLatestVidoes = (rid, pn = 1, ps = 20) => {
  return axios({
    method: 'get',
    url: '/region',
    params: {
      rid, pn, ps
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 
 * @param {Number} rid, required
 * @param {Number} day, default 7
 * @return {*}
 */
export const getChannelRecommendVidoes = (rid, day = 7) => {
  return axios({
    method: 'get',
    url: '/region_ranking',
    params: {
      rid, day
    }
  }).catch((err) => console.log("error", err))
}

