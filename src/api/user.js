import axios from './index'

/**
 * @func: 获取用户信息
 * @param {Number} mid, required, user's vmid
 * @return {Object} res.data
 */
export const getUserInfo = (mid) => {
  return axios({
    method: 'get',
    url: '/user_info',
    params: {
      mid
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 获取用户状态数值
 * @param {Number} vmid, required, user's vmid
 * @return {Object} res.data
 * - following, 关注数
 * - whisper, 悄悄关注数（需要登陆，且只显示登录用户自身的，否则为 0）
 * - black, 黑名单数（需要登陆，且只显示登录用户自身的，否则为 0）
 * - followe, 粉丝数	
 */
export const getUserStat = (vmid) => {
  return axios({
    method: 'get',
    url: '/user_stat',
    params: {
      vmid
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 获取用户所有收藏夹
 * @param {Number} mid, required, user's mid
 * @return {Array} res.data.list
 * [{id, fid, mid, attr, title, fav_stat, media_count}]
 */
export const getUserFavorites = (mid) => {
  return axios({
    method: 'get',
    url: '/user_favorites',
    params: {
      mid
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 获取收藏夹信息
 * @param {Number} media_id
 * @return {*}
 */
export const getFavInfo = (media_id) => {
  return axios({
    method: 'get',
    url: '/fav_info',
    params: {
      media_id
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 获取收藏夹内容列表
 * @param {Number} media_id
 * @param {Number} ps
 * @return {*}
 */
export const getFavContent = (media_id, ps = 10, pn = 1) => {
  return axios({
    method: 'get',
    url: '/fav_content',
    params: {
      media_id,
      ps,
      pn,
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 获取观看历史记录
 * @param {Number} max, optional, 历史记录截止目标 id,
 * @param {String} business, optional, 历史记录截止目标业务类型
 * @param {Number} view_at, optional, 历史记录截止时间
 * @param {String} type, optional, 历史记录分类筛选
 * @param {Number} ps, optional, 每页项数
 * @return {*} res.data
 * - cursor {Object}
 * - list {Array}
 * - 1tab {Array}
 */
export const getUserHistory = (options = { max: 0, business: '', view_at: 0, type: 'all', ps: 20 }) => {
  const { max, business, view_at, type, ps, } = options

  return axios({
    method: 'get',
    url: '/user_history',
    params: {
      max, business, view_at, type, ps,
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 获取用户动态
 * @param {Number} uid, user's id
 * @param {String} offsetId, 动态对象.desc.dynamic_id_str
 * @return {Object}
 * - attentions {Object}
 * - cards {[Obejct]}
 * - has_more {1|0}
 * - next_offset {Number}
 */
export const getUserDynamics = (uid, offsetId) => {
  return axios({
    method: 'get',
    url: '/space/dynamics',
    params: {
      uid,
      offsetId
    }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 获取用户发布的视频
 * @param {Object}
 * - {Number} mid, required, user's id
 * - {String} w_id, required, Wbi 签名
 * - {Number} wts, required, Wbi 当前时间戳
 * - {String} order, sort order, pubdate (default)| click | stow 收藏
 * - {Number} tid, 0 (default), 分区 id, 筛选目标分区
 * - {String} keyword, 关键词筛选
 * - {Number} pn, page number
 * - {Number} ps, page size, 30 (default), [1, 50]
 * @return {*}
 */
export const getUserVideos = (
  {
    mid,
    w_id,
    wts,
    order = 'pubdate',  // click | stow
    tid = 0,
    keyword = '',
    pn = 1,
    ps = 30,
  },
  // { query },
) => {
  return axios({
    method: 'get',
    url: '/space/videos',
    params: {
      mid,
      order,
      tid,
      keyword,
      pn,
      ps,
      // w_id,
      // wts,
      // query,
    }
  }).catch((err) => console.log("error", err))
}
