<script setup>
const props = defineProps({
  header: {
    type: String
  }
})
</script>

<template>
  <div class="chart-card">
    <el-card class="box-card" :header="props.header">
      <slot>默认的内容</slot>
    </el-card>
  </div>
</template>

<style scoped>
.chart-card {
  margin-top: 20px;
  background-color: #fff;
}
</style>
