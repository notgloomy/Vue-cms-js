<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['SearchClick', 'ResetClick'])
const formRef = ref(null)
const searchForm = reactive({
  title: '',
  createAt: ''
})
const handlerReset = () => {
  formRef.value.resetFields()
  emit('ResetClick')
}
const handlerSearch = () => {
  emit('SearchClick', searchForm)
}
</script>

<template>
  <div class="search">
    <el-form class="searchForm" ref="formRef" :model="searchForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="文章名" size="large" prop="title">
            <el-input
              placeholder="请输入查询的文章名"
              v-model="searchForm.title"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="创建时间"
            size="large"
            class="form"
            prop="createAt"
          >
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handlerReset"
        >重置</el-button
      >
      <el-button
        type="primary"
        size="large"
        icon="Search"
        @click="handlerSearch"
        >查询</el-button
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 30px 80px;
  border-radius: 5px;
  .el-form-item {
    padding: 10px;
  }
  .btns {
    padding-right: 10px;
    display: flex;
    justify-content: flex-end;
    .i {
      margin-right: 5px;
    }
  }
}
</style>
