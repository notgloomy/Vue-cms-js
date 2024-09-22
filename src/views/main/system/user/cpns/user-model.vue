<script setup>
import { ref, reactive } from 'vue'
import { useSystemStore } from '@/stores/modules/system.js'
import { useListStore } from '@/stores/modules/userList.js'
import { ReqCreateUser, ReqEditUser } from '@/apis/user.js'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
const systemStore = useSystemStore()
const listStore = useListStore()
systemStore.getDepartmentList()
systemStore.getRoleList()

const { departmentList, roleList } = storeToRefs(systemStore)

// 用来记录id
const formId = ref(null)
const createForm = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  departmentId: '',
  roleId: ''
})

const userRef = ref('')

// 创建用户与编辑用户相关操作
const createUserClick = async () => {
  if (isCreate.value) {
    await ReqCreateUser(createForm)
    ElMessage.success('创建成功')
    centerDialogVisible.value = false
    listStore.getUserList({ offset: 0, size: 10 })
  } else {
    await ReqEditUser(formId.value, createForm)
    ElMessage.success('编辑成功')
    centerDialogVisible.value = false
    listStore.getUserList({ offset: 0, size: 10 })
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
    :title="isCreate ? '创建用户' : '编辑用户'"
    width="460"
    center
  >
    <el-form :model="createForm" label-width="80px" ref="userRef">
      <el-form-item label="用户名" size="large" prop="name">
        <el-input v-model="createForm.name" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="真实姓名" size="large" prop="realname">
        <el-input v-model="createForm.realname" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item label="密码" size="large" prop="password" v-if="isCreate">
        <el-input
          v-model="createForm.password"
          placeholder="请输入密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="手机号码" size="large" prop="cellphone">
        <el-input v-model="createForm.cellphone" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="选择部门" size="large" prop="departmentId">
        <el-select placeholder="请选择部门" v-model="createForm.departmentId">
          <template v-for="item in departmentList" :key="item.id">
            <el-option :value="item.id" :label="item.name"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="选择角色" size="large" prop="roleId">
        <el-select placeholder="请选择角色" v-model="createForm.roleId">
          <template v-for="item in roleList" :key="item.id">
            <el-option :value="item.id" :label="item.name"></el-option>
          </template>
        </el-select>
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
