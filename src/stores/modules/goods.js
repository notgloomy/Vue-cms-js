import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  ReqGetgoodsAmount,
  ReqGetgoodsCategoryCount,
  ReqGetgoodsCategorySale,
  ReqGetgoodsAddressSale,
  ReqGetgoodsCategoryFavor,
  ReqGetgoodsCategory,
  ReqGetgoodsList
} from '@/apis/goods'
export const useGoodStore = defineStore('good', () => {
  //商品资料信息
  const goodAmountList = ref([])
  const goodCategoryCount = ref([])
  const goodCategorySale = ref([])
  const goodCategoryFavor = ref([])
  const goodAddressSale = ref([])

  // 商品类别信息
  const goodCategoryList = ref([])
  const listCount = ref(-1)
  // 商品信息
  const goodList = ref([])
  const goodCount = ref(-1)

  // 获取商品资料信息
  const getGoodDataAction = async () => {
    const res = await ReqGetgoodsAmount()
    goodAmountList.value = res.data.data

    const res2 = await ReqGetgoodsCategoryCount()
    goodCategoryCount.value = res2.data.data
    console.log('goodCategoryCount updated:', goodCategoryCount.value)

    const res3 = await ReqGetgoodsCategorySale()
    goodCategorySale.value = res3.data.data

    const res4 = await ReqGetgoodsCategoryFavor()
    goodCategoryFavor.value = res4.data.data

    const res5 = await ReqGetgoodsAddressSale()
    goodAddressSale.value = res5.data.data
  }
  // 获取商品类别信息
  const getGoodCategoryList = async (formData) => {
    const res = await ReqGetgoodsCategory(formData)
    goodCategoryList.value = res.data.data.list
    listCount.value = res.data.data.totalCount
  }
  // 获取商品列表
  const getGoodList = async (formData) => {
    const res = await ReqGetgoodsList(formData)
    goodList.value = res.data.data.list
    goodCount.value = res.data.data.totalCount
  }

  return {
    getGoodDataAction,
    goodAmountList,
    goodCategorySale,
    goodCategoryFavor,
    goodCategoryCount,
    goodAddressSale,
    getGoodCategoryList,
    goodCategoryList,
    listCount,
    getGoodList,
    goodList,
    goodCount
  }
})
