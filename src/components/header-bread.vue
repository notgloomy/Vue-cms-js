<script setup>
import { computed } from 'vue'
import { routeToBread } from '@/utils/RouteBread.js'
import { useUserStore } from '@/stores/modules/user'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()
const breadcrumb = computed(() => {
  return routeToBread(route.path, userStore.userMenu)
})
console.log(breadcrumb)
</script>

<template>
  <div class="bread">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped></style>
