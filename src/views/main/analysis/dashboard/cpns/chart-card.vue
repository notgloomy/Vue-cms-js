<script setup></script>

<template>
  <div class="chart-card">
    <el-card class="box-card" header="卡片的头部标题">
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
