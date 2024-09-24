<script setup>
import storyBody from './cpns/story-body.vue'
import storyModel from './cpns/story-model.vue'
import storySearch from './cpns/story-search.vue'
import { ref } from 'vue'
const bodyRef = ref('')
const modelRef = ref('')
// 重置操作
const handlerResetClick = () => {
  bodyRef.value.handleGetStoryList()
}
// 查看操作
const handlerSearchClick = (formData) => {
  bodyRef.value.handleGetStoryList(formData)
}
// 查看操作
const handlerLookClick = (formData) => {
  modelRef.value.VisibleFunction(formData)
}
</script>

<template>
  <div class="story-list">
    <storySearch
      @ResetClick="handlerResetClick"
      @SearchClick="handlerSearchClick"
    />
    <storyBody ref="bodyRef" @LookClick="handlerLookClick" />
    <storyModel ref="modelRef" />
  </div>
</template>

<style scoped></style>
