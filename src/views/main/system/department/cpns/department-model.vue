<script setup>
import { ref, reactive } from 'vue'
import { useSystemStore } from '@/stores/modules/system.js'
import { useListStore } from '@/stores/modules/userList.js'
import { ReqCreateDepartment, ReqEditDepartment } from '@/apis/system.js'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
const systemStore = useSystemStore()
const listStore = useListStore()

const { departmentList } = storeToRefs(systemStore)

// 用来记录id
const formId = ref(null)
const createForm = reactive({
  name: '',
  parentId: '',
  leader: ''
})

const userRef = ref('')

const isCreate = ref(true)
const centerDialogVisible = ref(false)
// 创建用户与编辑用户相关操作
const createDepartmentClick = async () => {
  if (isCreate.value) {
    await ReqCreateDepartment(createForm)
    ElMessage.success('创建成功')
    centerDialogVisible.value = false
    systemStore.getDepartmentList({ offset: 0, size: 10 })
  } else {
    await ReqEditDepartment(formId.value, createForm)
    ElMessage.success('编辑成功')
    centerDialogVisible.value = false
    systemStore.getDepartmentList({ offset: 0, size: 10 })
  }
}

listStore.getUserList()
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
    :title="isCreate ? '创建部门' : '编辑部门'"
    width="460"
    center
  >
    <el-form :model="createForm" label-width="80px" ref="userRef">
      <el-form-item label="部门名称" size="large" prop="name">
        <el-input v-model="createForm.name" placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item label="上级部门" size="large" prop="parentId">
        <el-select placeholder="请选择上级部门" v-model="createForm.parentId">
          <template v-for="item in departmentList" :key="item.id">
            <el-option :value="item.id" :label="item.name"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="部门领导" size="large" prop="leader">
        <el-input v-model="createForm.leader" placeholder="请输入上级领导" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createDepartmentClick">
          确定
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
