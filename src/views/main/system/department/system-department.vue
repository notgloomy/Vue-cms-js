<script setup>
import departmentBody from './cpns/department-body.vue'
import departmentModel from './cpns/department-model.vue'
import departmentSearch from './cpns/department-search.vue'
import { ref } from 'vue'
const bodyRef = ref('')
const modelRef = ref('')
// 重置有关的操作
const handlerResetClick = () => {
  bodyRef.value?.handleGetDepartmentList()
}
// 搜索有关的操作
const handlerSearchClick = (formData) => {
  bodyRef.value?.handleGetDepartmentList(formData)
}

// 添加有关的操作
const handlerCreateClick = () => {
  modelRef.value.VisibleFunction(true)
}
// 编辑有关的操作
const handlerEditClick = (formData) => {
  modelRef.value.VisibleFunction(false, formData)
}
</script>

<template>
  <div class="system-department">
    <departmentSearch
      @SearchClick="handlerSearchClick"
      @ResetClick="handlerResetClick"
    />
    <departmentBody
      ref="bodyRef"
      @EditClick="handlerEditClick"
      @CreateClick="handlerCreateClick"
    />
    <departmentModel ref="modelRef" />
  </div>
</template>

<style scoped></style>
