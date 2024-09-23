<script setup>
import categoryBody from './cpns/category-body.vue'
import categoryModel from './cpns/category-model.vue'
import categorySearch from './cpns/category-search.vue'
import { ref } from 'vue'
const bodyRef = ref('')
const modelRef = ref('')
// 重置操作
const handlerResetClick = () => {
  bodyRef.value.handleGetGoodCategoryList()
}
// 搜索操作
const handlerSearchClick = (formData) => {
  bodyRef.value.handleGetGoodCategoryList(formData)
}
// 创建操作
const handlerCreateClick = () => {
  modelRef.value.VisibleFunction(true)
}
// 编辑操作
const handlerEditClick = (formData) => {
  modelRef.value.VisibleFunction(false, formData)
}
</script>

<template>
  <div class="product-category">
    <categorySearch
      @ResetClick="handlerResetClick"
      @SearchClick="handlerSearchClick"
    />
    <categoryBody
      ref="bodyRef"
      @CreateClick="handlerCreateClick"
      @EditClick="handlerEditClick"
    />
    <categoryModel ref="modelRef" />
  </div>
</template>

<style scoped></style>
