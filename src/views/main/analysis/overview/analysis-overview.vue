<script setup></script>

<template>
  <div class="analysis-overview">
    <div class="analysis-content">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-descriptions
            title="系统所用核心技术"
            direction="vertical"
            :column="1"
            size="large"
            border
          >
            <el-descriptions-item label="所用框架">vue3</el-descriptions-item>
            <el-descriptions-item label="所用语言"
              >javaScript</el-descriptions-item
            >
            <el-descriptions-item label="打包工具">Vite</el-descriptions-item>
            <el-descriptions-item label="github地址">
              https://github.com/notgloomy/Vue-cms-js/settings
            </el-descriptions-item>
            <el-descriptions-item label="项目要点">
              动态路由,权限分配,增删改查
            </el-descriptions-item>
            <el-descriptions-item label="CSS库"> less </el-descriptions-item>
            <el-descriptions-item label="视图库">
              echarts
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col :span="12">
          <div class="img">
            <img src="../../../../assets/img/overview.jpg" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="less">
.analysis-content {
  padding: 5px;
  .img {
    margin-top: 40px;
    img {
      width: 100%; /* 图片的最大宽度为容器的宽度 */
      height: 670px;
    }
  }
}
</style>
