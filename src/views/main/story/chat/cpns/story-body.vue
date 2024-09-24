<script setup>
import { useStoryStore } from '@/stores/modules/story.js'
import { ReqCreateStory } from '@/apis/story.js'
import { reactive } from 'vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref('')
const storyStore = useStoryStore()

const storyForm = reactive({
  title: '',
  content: ''
})

const handlerReset = () => {
  formRef.value.resetFields()
}
const handlerCreateStory = async () => {
  await ReqCreateStory(storyForm)
  ElMessage.success('创建故事成功')
  handleGetStoryList()
  formRef.value.resetFields()
}

// 页面相关的逻辑
const currentPage = ref(1)
const pageSize = ref(10)

// 封装获取用户列表
const handleGetStoryList = () => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const queryList = { size, offset }
  storyStore.getStoryList(queryList)
}

// 向外暴露获取用户列表
defineExpose({ handleGetStoryList })
</script>

<template>
  <div class="body">
    <div class="body-header">
      <div class="headerText">你的故事</div>
    </div>
    <div class="bodyContent">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="body-form">
            <el-form :model="storyForm" ref="formRef">
              <el-form-item label="文章标题" prop="title">
                <el-input
                  placeholder="请输入文章标题"
                  v-model="storyForm.title"
                  size="large"
                ></el-input>
              </el-form-item>
              <el-form-item label="文章内容" prop="content">
                <el-input
                  type="textarea"
                  placeholder="请输入文章内容"
                  :rows="5"
                  v-model="storyForm.content"
                  size="large"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="body-foot">
              <el-button size="large" @click="handlerReset">重置</el-button>
              <el-button type="primary" size="large" @click="handlerCreateStory"
                >创建</el-button
              >
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="bodyImage">
            <img src="../../../../../assets/img/story.jpg" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="less">
.body {
  background-color: #fff;
  border-radius: 5px;
  margin-top: 20px;
  padding: 20px;
  .body-header {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  }
  .headerText {
    font-weight: 700;
    font-size: 22px;
  }
  .bodyContent {
    margin: 20px 0;
    padding: 5px;
    .body-form {
      margin-top: 80px;
    }
    .body-foot {
      display: flex;
      justify-content: flex-end;
    }
    .bodyImage {
      img {
        width: 100%; /* 图片的最大宽度为容器的宽度 */
        height: auto;
      }
    }
  }
}
</style>
