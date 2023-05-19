import axios from './index'

/**
 * @func: 排行榜的分区，与分区页面的分区有区别
 * @return {Object} data
 */
export const getRankChannels = () => {
  return axios({
    method: 'get',
    url: '/ranking_channels',
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 排行榜
 * @param {Number} rid 分区 id, 不写为总榜
 * @return {Object} data.list(100)
 */
export const getRank = (rid) => {
  return axios({
    method: 'get',
    url: '/ranking',
    params: {
      rid
    }
  }).catch((err) => console.log("error", err))
}
