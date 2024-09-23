<script setup>
import { ref, reactive } from 'vue'
import { ReqCreategoods, ReqUpdategoods } from '@/apis/goods.js'
import { ElMessage } from 'element-plus'
import { useGoodStore } from '@/stores/modules/goods'
const goodStore = useGoodStore()
// 用来记录id
const formId = ref(null)
const createForm = reactive({
  name: '',
  oldPrice: '',
  newPrice: '',
  desc: '',
  status: 1,
  imgUrl: '',
  inventoryCount: '',
  saleCount: '',
  favorCount: '',
  address: ''
})

const userRef = ref('')

// 创建用户与编辑用户相关操作
const createUserClick = async () => {
  if (isCreate.value) {
    await ReqCreategoods(createForm)
    ElMessage.success('创建成功')
    centerDialogVisible.value = false
    goodStore.getGoodList({ offset: 0, size: 10 })
  } else {
    await ReqUpdategoods(formId.value, createForm)
    ElMessage.success('编辑成功')
    centerDialogVisible.value = false
    goodStore.getGoodList({ offset: 0, size: 10 })
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
      <el-form-item label="商品名称" size="large" prop="name">
        <el-input v-model="createForm.name" placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="旧价格" size="large" prop="oldPrice">
        <el-input v-model="createForm.oldPrice" placeholder="请输入旧价格" />
      </el-form-item>
      <el-form-item label="新价格" size="large" prop="newPrice">
        <el-input v-model="createForm.newPrice" placeholder="请输入新价格" />
      </el-form-item>
      <el-form-item label="描述" size="large" prop="desc">
        <el-input v-model="createForm.desc" placeholder="请输入商品描述" />
      </el-form-item>
      <el-form-item label="图片" size="large" prop="imgUrl">
        <el-input v-model="createForm.imgUrl" placeholder="请输入图片地址" />
      </el-form-item>
      <el-form-item label="库存数量" size="large" prop="inventoryCount">
        <el-input
          v-model="createForm.inventoryCount"
          placeholder="请输入库存数量"
        />
      </el-form-item>
      <el-form-item label="销售数量" size="large" prop="saleCount">
        <el-input v-model="createForm.saleCount" placeholder="请输入销售数量" />
      </el-form-item>
      <el-form-item label="收藏数量" size="large" prop="favorCount">
        <el-input
          v-model="createForm.favorCount"
          placeholder="请输入收藏数量"
        />
      </el-form-item>
      <el-form-item label="生产地址" size="large" prop="address">
        <el-input v-model="createForm.address" placeholder="请输入生产地址" />
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
