import axios from './index'

export const getMallIndex = () => {
  return axios({
    method: 'get',
    url: '/mall/index',
  }).catch(err => console.log('error', err))
}

export const getMallIndexProducts = (pn = 2) => {
  return axios({
    method: 'get',
    url: '/mall/index/products',
    params: { pn }
  }).catch(err => console.log('error', err))
}

export const getMallCategories = () => {
  return axios({
    method: 'get',
    url: '/mall/category',
  }).catch(err => console.log('error', err))
}

export const getProducts = () => {
  return axios({
    method: 'get',
    url: '/mall/products',
    params: {
    }
  }).catch((err) => console.log("error", err))
}

export const getFilterAllFilters = ({
  scene = "figure",
  keyword = '',
  filterType = 1,
  termQueries = []
}) => {
  return axios({
    method: 'get',
    url: '/mall/category/allfilter',
    params: {
      filterType,
      keyword,
      scene,
      termQueries: JSON.stringify(termQueries),
    }
  }).catch((err) => console.log("error", err))
}

export const getFilteredProductCount = (data) => {
  return axios({
    method: 'post',
    url: '/mall/category/filtered/count',
    data,
  }).catch((err) => console.log("error", err))
}
