import { mockAxios } from './index'

// mock
// 首页
export const getHomeData = () => mockAxios.get('/home')
// hot
export const getMockPopular = () => mockAxios.get('/popular')
