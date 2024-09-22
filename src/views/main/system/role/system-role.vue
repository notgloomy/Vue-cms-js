<script setup>
import roleBody from './cpns/role-body.vue'
import roleModel from './cpns/role-model.vue'
import roleSearch from './cpns/role-search.vue'
import { ref } from 'vue'
const roleBodyRef = ref('')
const roleModelRef = ref('')
// 搜索有关
const handlerSearchClick = (searchForm) => {
  roleBodyRef?.value.handleGetRoleList(searchForm)
}
// 重置有关
const handlerResetClick = () => {
  roleBodyRef?.value.handleGetRoleList()
}
// 增加有关
const handlerCreateClick = () => {
  roleModelRef.value.VisibleFunction(true)
}
// 编辑有关
const handlerEditClick = (formData) => {
  roleModelRef.value.VisibleFunction(false, formData)
}
</script>

<template>
  <div class="system-role">
    <roleSearch
      @SearchClick="handlerSearchClick"
      @ResetClick="handlerResetClick"
    />
    <roleBody
      ref="roleBodyRef"
      @CreateClick="handlerCreateClick"
      @EditClick="handlerEditClick"
    />
    <roleModel ref="roleModelRef" />
  </div>
</template>

<style scoped></style>
