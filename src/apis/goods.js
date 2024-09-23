import instance from '@/service/request'
// 与商品有关的接口

// 获取商品数据统计的数量
export const ReqGetgoodsAmount = () => {
  return instance.get('/goods/amount/list')
}

// 获取每个分类商品的个数
export const ReqGetgoodsCategoryCount = () => {
  return instance.get('/goods/category/count')
}

// 获取每个分类商品的销量
export const ReqGetgoodsCategorySale = () => {
  return instance.get('/goods/category/sale')
}

// 获取每个分类商品的收藏
export const ReqGetgoodsCategoryFavor = () => {
  return instance.get('/goods/category/favor')
}

// 获取不同城市的销量数据
export const ReqGetgoodsAddressSale = () => {
  return instance.get('/goods/address/sale')
}

// 获取商品的类别
export const ReqGetgoodsCategory = (queryList) => {
  return instance.post('/category/list', queryList)
}

// 创建类别
export const ReqCreateGoodsCategory = (queryList) => {
  return instance.post('/category', queryList)
}

// 删除类别
export const ReqDeleteGoodsCategory = (id) => {
  return instance.delete(`/category/${id}`)
}

// 更新类别
export const ReqUpdateGoodsCategory = (id, queryList) => {
  return instance.patch(`/category/${id}`, queryList)
}
