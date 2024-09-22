<script setup>
import { ref, reactive } from 'vue'
import { useSystemStore } from '@/stores/modules/system.js'
import { ReqCreateRole, ReqEditRole } from '@/apis/system.js'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus.js'
import { nextTick } from 'vue'
const systemStore = useSystemStore()
systemStore.getMenuList()

const { menuList } = storeToRefs(systemStore)

// 用来记录id
const formId = ref(null)
const createForm = reactive({
  name: '',
  intro: ''
})

const userRef = ref('')
const treeRef = ref('')
// 创建用户与编辑用户相关操作
const createUserClick = async () => {
  let endForm = { ...createForm, ...otherInfo.value }
  if (isCreate.value) {
    await ReqCreateRole(endForm)
    ElMessage.success('创建成功')
    centerDialogVisible.value = false
    systemStore.getRoleList({ offset: 0, size: 10 })
  } else {
    await ReqEditRole(formId.value, endForm)
    ElMessage.success('编辑成功')
    centerDialogVisible.value = false
    systemStore.getRoleList({ offset: 0, size: 10 })
  }
  console.log(endForm)
}
const isCreate = ref(true)
const centerDialogVisible = ref(false)

const otherInfo = ref({})
const handleCheckChange = (data1, data2) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
  console.log(otherInfo.value)
}

// isNew控制是编辑还是新增，formData是待回显的数据
const VisibleFunction = (isNew = true, formData = {}) => {
  centerDialogVisible.value = true
  if (!isNew && formData) {
    formId.value = formData.id
    for (const key in createForm) {
      createForm[key] = formData[key]
    }
    nextTick(() => {
      // 回显编辑树
      const menuIds = mapMenuListToIds(formData.menuList)
      if (menuIds) {
        treeRef.value?.setCheckedKeys(menuIds)
      }
    })
  } else {
    formId.value = null
    for (const key in createForm) {
      createForm[key] = ''
    }
    nextTick(() => {
      treeRef.value?.setCheckedKeys([])
    })
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
      <el-form-item label="角色名称" size="large" prop="name">
        <el-input v-model="createForm.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="权限介绍" size="large" prop="intro">
        <el-input v-model="createForm.intro" placeholder="请输入权限介绍" />
      </el-form-item>
      <el-form-item size="large" prop="menuList">
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :props="{ children: 'children', label: 'name' }"
          :data="menuList"
          node-key="id"
          show-checkbox
          @check="handleCheckChange"
        />
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
