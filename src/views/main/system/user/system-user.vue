<script setup>
import UserSearch from './cpns/user-search.vue'
import UserBody from './cpns/user-body.vue'
import UserModel from './cpns/user-model.vue'
import { ref } from 'vue'
const userBody = ref('')
const userModel = ref('')

// 跟搜索有关的操作
const handlerSearchClick = (searchForm) => {
  userBody.value?.handleGetUserList(searchForm)
  console.log(searchForm)
}

// 重置有关的操作
const handlerResetClick = () => {
  userBody.value?.handleGetUserList()
}

// 新增有关的操作
const handlerCreateClick = () => {
  userModel.value.VisibleFunction(true)
}
// 编辑有关的操作
const handlerEditClick = (formData) => {
  userModel.value.VisibleFunction(false, formData)
}
</script>

<template>
  <div class="system-user">
    <UserSearch
      @SearchClick="handlerSearchClick"
      @ResetClick="handlerResetClick"
    />
    <UserBody
      ref="userBody"
      @CreateClick="handlerCreateClick"
      @EditClick="handlerEditClick"
    />
    <UserModel ref="userModel" />
  </div>
</template>

<style scoped lang="less"></style>
