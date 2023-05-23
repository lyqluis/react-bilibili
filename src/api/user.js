import axios from './index'

/**
 * @func: 获取用户状态数值
 * @param {Number} vmid, required, user's vmid
 * @return {Object} res.data
 * - following, 关注数
 * - whisper, 悄悄关注数
 * - black, 黑名单数
 * - followe, 粉丝数	
 */
export const getUserStat = (vmid) => {
  return axios({
    method: 'get',
    url: '/userstat',
    params: {
      vmid
    }
  }).catch((err) => console.log("error", err))
}
