<script setup>
import MainMenu from './cpns/main-menu.vue'
import MainHeader from './cpns/main-header.vue'
import { ref } from 'vue'
const isCollapse = ref(false)

const collapseHandler = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<template>
  <div class="main">
    <el-container class="common-layout">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <MainMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header><MainHeader @foldChange="collapseHandler" /></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped lang="less">
.main {
  height: 100%;
  .common-layout {
    height: 100%;
  }
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;
    background-color: #001529;
    cursor: pointer;
    line-height: 50px;
    transition: width 1s ease;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
