<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, watchEffect } from 'vue'
import ChinaJSON from '../data/china.json'

echarts.registerMap('china', ChinaJSON)

const echartRef = ref('')
const props = defineProps({
  option: {
    type: Object
  }
})
onMounted(() => {
  // 1.初始化echarts
  const echartInstance = echarts.init(echartRef.value, 'light', {
    renderer: 'canvas'
  })
  // 2.第一次进行setOption
  // watchEffect监听option变化, 重新执行
  watchEffect(() => echartInstance.setOption(props.option))

  // 3.监听window缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<style scoped>
.echart {
  height: 300px;
}
</style>
