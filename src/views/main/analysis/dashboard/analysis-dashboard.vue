<script setup>
import { storeToRefs } from 'pinia'
import summaryCard from './cpns/summary-card.vue'
import chartCard from './cpns/chart-card.vue'
import pieEchart from '@/components/page-echarts/src/pie-echart.vue'
import rosepieEchart from '@/components/page-echarts/src/rosePie-echart.vue'
import lineEchart from '@/components/page-echarts/src/line-echart.vue'
import barEchart from '@/components/page-echarts/src/bar-echart.vue'
import mapEchart from '@/components/page-echarts/src/map-echart.vue'
import { useGoodStore } from '@/stores/modules/goods.js'
import { computed } from 'vue'
import { onMounted } from 'vue'

const goodsStore = useGoodStore()
onMounted(() => {
  goodsStore.getGoodDataAction()
})
const {
  goodAmountList,
  goodCategoryCount,
  goodCategorySale,
  goodCategoryFavor,
  goodAddressSale
} = storeToRefs(goodsStore)

// 获取数据
const showGoodsCategoryCount = computed(() => {
  return goodCategoryCount?.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsCategorySale = computed(() => {
  const labels = goodCategorySale.value.map((item) => item.name)
  const values = goodCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = goodCategoryFavor.value.map((item) => item.name)
  const values = goodCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<template>
  <!-- 商品汇总模块 -->
  <el-row :gutter="20">
    <el-col
      :span="6"
      v-for="item in goodAmountList"
      :key="item"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
    >
      <summaryCard
        :amount="item.amount"
        :title="item.title"
        :subtitle="item.subtitle"
        :number1="item.number1"
        :number2="item.number2"
        :tips="item.tips"
      />
    </el-col>
  </el-row>
  <!-- 图表模块 -->
  <el-row :gutter="20">
    <el-col :span="7">
      <chartCard :header="'商品数据统计的数量(饼图)'">
        <pieEchart :pieData="showGoodsCategoryCount" /> </chartCard
    ></el-col>
    <el-col :span="10"
      ><chartCard :header="'不同城市的销量数据'">
        <mapEchart :mapData="showGoodsAddressSale" /> </chartCard
    ></el-col>
    <el-col :span="7"
      ><chartCard :header="'商品数据统计的数量(玫瑰图)'">
        <rosepieEchart :roseData="showGoodsCategoryCount" /> </chartCard
    ></el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="12"
      ><chartCard :header="'每个分类商品的销量'">
        <lineEchart v-bind="showGoodsCategorySale" /> </chartCard
    ></el-col>
    <el-col :span="12"
      ><chartCard :header="'每个分类商品的收藏数量'">
        <barEchart v-bind="showGoodsCategoryFavor" /> </chartCard
    ></el-col>
  </el-row>
</template>

<style scoped lang="less"></style>
