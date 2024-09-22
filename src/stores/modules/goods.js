import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  ReqGetgoodsAmount,
  ReqGetgoodsCategoryCount,
  ReqGetgoodsCategorySale,
  ReqGetgoodsAddressSale,
  ReqGetgoodsCategoryFavor
} from '@/apis/goods'
export const useGoodStore = defineStore('good', () => {
  const goodAmountList = ref([])
  const goodCategoryCount = ref([])
  const goodCategorySale = ref([])
  const goodCategoryFavor = ref([])
  const goodAddressSale = ref([])

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

  return {
    getGoodDataAction,
    goodAmountList,
    goodCategoryCount,
    goodCategorySale,
    goodCategoryFavor,
    goodAddressSale
  }
})
