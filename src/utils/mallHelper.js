import { deepClone } from "./global"

export const defaultFilter = {
  keyword: "",
  filters: {},
  priceFlow: "",
  priceCeil: "",
  sortType: "totalrank", // 排序，totalrank | sale | price | pubtime, 综合｜销量｜价格｜新品
  sortOrder: "", // 配合 sortType: 'price' 使用，desc | asc, 价格降序｜价格升序
  userId: "",
  state: "",
  scene: "", // PC_list | figure | ''
  termQueries: [], // required，获取商品数据必须的查询参数
  rangeQueries: [],
  // from: "pc_show",
  msource: "",
}

export const getFilterObj = location => {
  const hash = location.hash.match(/#([\w_=&%]*)/)?.[1]
  const decodedHash = decodeURIComponent(decodeURIComponent(hash))
  const query = location.search.match(/\?([\w_=&%]*)/)[1]
  const decodedQuery = decodeURIComponent(decodeURIComponent(query))
  const filterArr = [...decodedHash.split("&"), ...decodedQuery.split("&")]
  const filter = {}
  filterArr.map((val) => {
    const res = val.split("=")
    filter[res[0]] = /^\{|\[/.test(res[1]) ? JSON.parse(res[1]) : res[1]
  })
  return filter
}

export const formatIndexList = data => {
  const res = { ...data }
  const list = data.filterList
  const newList = []
  list.forEach((item) => {
    newList.push(...Object.entries(item))
  })
  res.filterList = newList
  console.log("fetch all filter", newList)
  return res
}

const fields = ['category', 'ip', 'brand']
export const formateFilter = (rawFilter, defaultFilter) => {
  const res = deepClone(defaultFilter)
  for (const key in res) {
    if (rawFilter[key]) {
      res[key] = typeof defaultFilter[key] === 'number' ? parseInt(rawFilter[key]) : rawFilter[key]
    }
  }
  // field
  const field = fields.find(key => rawFilter[key])
  field && res.termQueries.push({
    field,
    values: [rawFilter[field]]
  })
  // detailfilter
  if (rawFilter.detailFilter) {
    const detailFilter = rawFilter.detailFilter
    const categories = Object.entries(detailFilter.categories)
    res.termQueries.push(...categories.map(([key, val]) => {
      res.filters[key] = val
      return {
        field: key,
        values: val
      }
    }))
    const price = detailFilter.price
    res.priceCeil = price.priceCeil
    res.priceFlow = price.priceFlow
  }
  // todo rangeQueries
  return res
}
