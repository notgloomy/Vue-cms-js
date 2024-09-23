<script setup>
import { ref, reactive } from 'vue'
import { ReqCreateGoodsCategory, ReqUpdateGoodsCategory } from '@/apis/goods.js'
import { useGoodStore } from '@/stores/modules/goods'
import { ElMessage } from 'element-plus'

const goodStore = useGoodStore()
// 用来记录id
const formId = ref(null)
const createForm = reactive({
  name: ''
})

const userRef = ref('')

// 创建用户与编辑用户相关操作
const createUserClick = async () => {
  if (isCreate.value) {
    await ReqCreateGoodsCategory(createForm)
    ElMessage.success('创建成功')
    centerDialogVisible.value = false
    goodStore.getGoodCategoryList({ offset: 0, size: 10 })
  } else {
    await ReqUpdateGoodsCategory(formId.value, createForm)
    ElMessage.success('编辑成功')
    centerDialogVisible.value = false
    goodStore.getGoodCategoryList({ offset: 0, size: 10 })
  }
}
const isCreate = ref(true)
const centerDialogVisible = ref(false)

// isNew控制是编辑还是新增，formData是待回显的数据
const VisibleFunction = (isNew = true, formData = {}) => {
  centerDialogVisible.value = true
  if (!isNew && formData) {
    formId.value = formData.id
    for (const key in createForm) {
      createForm[key] = formData[key]
    }
  } else {
    formId.value = null
    for (const key in createForm) {
      createForm[key] = ''
    }
  }
  isCreate.value = isNew
}
defineExpose({ VisibleFunction })
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="isCreate ? '创建类别' : '编辑类别'"
    width="460"
    center
  >
    <el-form :model="createForm" label-width="80px" ref="userRef">
      <el-form-item label="类别名" size="large" prop="name">
        <el-input v-model="createForm.name" placeholder="请输入类别名" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createUserClick"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-form {
  padding: 0px 20px;
}
</style>
