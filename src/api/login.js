import axios from './index'

/**
 * @func: get qrcode key & url
 * @return {Obejct} res.data: { qurcode_key, url }
 */
export const getQRCodeKey = () => {
  return axios({
    method: 'get',
    url: '/qrcode/key',
  }).catch((err) => console.log("error", err))
}

/**
 * @func: get qrcode img
 * @param {String} url, qrcode's url from getQRCodeKey API
 * @return {Object} res.data. qrimg
 */
export const getQRCodeImg = url => {
  return axios({
    method: 'post',
    url: '/qrcode/create',
    data: { url }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 轮询 qrcode 状态
 * @param {String} key
 * @return {*}
 */
export const checkQRCode = key => {
  return axios({
    method: 'post',
    url: '/qrcode/poll',
    data: { key }
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 获得登陆状态
 * @return {Object} res.data
 */
export const getLoginInfo = () => {
  return axios({
    method: 'get',
    url: '/logininfo',
  }).catch((err) => console.log("error", err))
}

/**
 * @func: 登出
 * @return {Object}
 */
export const logout = () => {
  return axios({
    method: 'get',
    url: '/logout',
  }).catch((err) => console.log("error", err))
}