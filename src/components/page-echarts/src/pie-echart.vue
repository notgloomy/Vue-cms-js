<script setup>
import { computed } from 'vue'
import baseEchart from './base-echart.vue'

const props = defineProps({
  pieData: {
    required: true
  }
})
const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        bottom: '-10%',
        data: props?.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<template>
  <div class="pie-echart">
    <baseEchart :option="option" />
  </div>
</template>

<style scoped></style>
