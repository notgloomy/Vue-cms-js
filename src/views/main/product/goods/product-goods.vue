<script setup>
import goodBody from './cpns/good-body.vue'
import goodModel from './cpns/good-model.vue'
import goodSearch from './cpns/good-search.vue'
import { ref } from 'vue'
const bodyRef = ref('')
const modelRef = ref('')
// 重置操作
const handlerResetClick = () => {
  bodyRef.value.handleGetGoodList()
}
// 搜索操作
const handlerSearchClick = (formData) => {
  bodyRef.value.handleGetGoodList(formData)
}
// 添加操作
const handlerCreateClick = () => {
  modelRef.value.VisibleFunction(true)
}
// 编辑操作
const handlerEditClick = (formData) => {
  modelRef.value.VisibleFunction(false, formData)
}
</script>

<template>
  <div class="product-goods">
    <goodSearch
      @ResetClick="handlerResetClick"
      @SearchClick="handlerSearchClick"
    />
    <goodBody
      ref="bodyRef"
      @CreateClick="handlerCreateClick"
      @EditClick="handlerEditClick"
    />
    <goodModel ref="modelRef" />
  </div>
</template>

<style scoped></style>
