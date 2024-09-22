<script setup>
import { ref } from 'vue'
import HeaderInfo from '@/components/header-info.vue'
import HeaderBread from '@/components/header-bread.vue'
const isFold = ref(false)

const emits = defineEmits('foldChange')
// 判断是否折叠
const handlerFold = () => {
  // 内部改变状态
  isFold.value = !isFold.value
  // 将改变的状态传递给父组件
  emits('foldChange', isFold.value)
}
</script>

<template>
  <div class="main-header">
    <div class="menu-icon" @click="handlerFold">
      <el-icon size="26px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <HeaderBread />
      </div>
      <div class="info">
        <HeaderInfo />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.main-header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
  .content {
    width: 100%;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
