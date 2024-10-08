<script setup>
import { formatTime } from '@/utils/formatTime.js'
import { ReqDeleteDepartment } from '@/apis/system.js'
import { useSystemStore } from '@/stores/modules/system.js'
import { useUserStore } from '@/stores/modules/user.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const emits = defineEmits(['CreateClick', 'EditClick'])
const systemStore = useSystemStore()
const { departmentList, deTotal } = storeToRefs(systemStore)
const userStore = useUserStore()

// 获取按钮控制权限
const { permissions } = storeToRefs(userStore)
const isCreate = permissions.value.find((item) =>
  item.includes('system:department:create')
)
const isDelete = permissions.value.find((item) =>
  item.includes('system:department:delete')
)
const isEdit = permissions.value.find((item) =>
  item.includes('system:department:update')
)
const isSearch = permissions.value.find((item) =>
  item.includes('system:department:query')
)

// 页面相关的逻辑
const currentPage = ref(1)
const pageSize = ref(10)
const handleSizeChange = () => {
  // handleGetDepartmentList()
}
const handleCurrentChange = () => {
  // handleGetDepartmentList()
}

// 删除相关的逻辑
const handlerDelete = async (id) => {
  // 删除逻辑操作
  await ReqDeleteDepartment(id)
  // 重新请求新的数据
  //  handleGetDepartmentList()
}

// 新增功能相关的逻辑
const handlerCreateDepartment = () => {
  console.log('新建用户')
  emits('CreateClick')
}
// 编辑功能相关的逻辑
const handlerEditDepartment = (formData) => {
  emits('EditClick', formData)
}

// 封装获取用户列表
const handleGetDepartmentList = (searchForm = {}) => {
  if (isSearch === false) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const queryList = { size, offset }
  const endList = { ...queryList, ...searchForm }
  systemStore.getDepartmentList(endList)
}
handleGetDepartmentList()

// 向外暴露获取用户列表
defineExpose({ handleGetDepartmentList })
</script>

<template>
  <div class="body">
    <div class="body-header">
      <div class="headerText">部门列表</div>
      <el-button type="primary" @click="handlerCreateDepartment" v-if="isCreate"
        >新建部门</el-button
      >
    </div>
    <div class="body-table">
      <el-table :data="departmentList" border style="width: 100%">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="部门名称" align="center" />
        <el-table-column prop="leader" label="部门领导" align="center" />
        <el-table-column prop="parentId" label="上级部门" align="center" />
        <el-table-column
          prop="createAt"
          label="创建时间"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{ formatTime(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateAt"
          label="更新时间"
          align="center"
          width="200"
        >
          <template #default="scope">
            {{ formatTime(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              icon="Edit"
              size="small"
              type="primary"
              plain
              text
              style="padding: 0px"
              @click="handlerEditDepartment(scope.row)"
              v-if="isEdit"
              >编辑</el-button
            >
            <el-button
              icon="Delete"
              size="small"
              type="danger"
              plain
              text
              style="padding: 0px"
              @click="handlerDelete(scope.row.id)"
              v-if="isDelete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="body-page">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="deTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
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
    .headerText {
      font-weight: 700;
      font-size: 22px;
    }
  }
  .body-page {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
