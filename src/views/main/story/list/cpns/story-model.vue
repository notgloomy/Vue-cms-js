<script setup>
import { ref, reactive } from 'vue'

// 用来记录id
const formId = ref(null)
const createForm = reactive({
  title: '',
  content: ''
})

const userRef = ref('')
const centerDialogVisible = ref(false)

// isNew控制是编辑还是新增，formData是待回显的数据
const VisibleFunction = (formData = {}) => {
  centerDialogVisible.value = true
  formId.value = formData.id
  for (const key in createForm) {
    createForm[key] = formData[key]
  }
}
defineExpose({ VisibleFunction })
</script>

<template>
  <el-dialog v-model="centerDialogVisible" title="查看故事" width="600" center>
    <el-form :model="createForm" label-width="80px" ref="userRef">
      <el-form-item label="故事标题" size="large" prop="title">
        <el-input v-model="createForm.title" />
      </el-form-item>
      <el-form-item label="故事内容" size="large" prop="content">
        <el-input v-model="createForm.content" type="textarea" :rows="8" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-form {
  padding: 0px 20px;
}
</style>
