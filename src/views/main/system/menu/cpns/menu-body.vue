<script setup>
import { formatTime } from '@/utils/formatTime.js'
import { useSystemStore } from '@/stores/modules/system.js'
import { useUserStore } from '@/stores/modules/user'
import { storeToRefs } from 'pinia'
const systemStore = useSystemStore()
const userStore = useUserStore()
systemStore.getMenuList()

// 获取用户按钮权限
const { permissions } = storeToRefs(userStore)

const isCreate = permissions.value.find((item) =>
  item.includes('system:menu:create')
)
const isDelete = permissions.value.find((item) =>
  item.includes('system:menu:delete')
)
const isEdit = permissions.value.find((item) =>
  item.includes('system:menu:update')
)

// 封装获取用户列表
const handleGetUserList = () => {
  systemStore.getMenuList()
}
handleGetUserList()
const { menuList } = storeToRefs(systemStore)

// 向外暴露获取用户列表
defineExpose({ handleGetUserList })
</script>

<template>
  <div class="body">
    <div class="body-header">
      <div class="headerText">菜单列表</div>
      <el-button type="primary" v-if="isCreate">新建菜单</el-button>
    </div>
    <div class="body-table">
      <el-table :data="menuList" border style="width: 100%" row-key="id">
        <el-table-column prop="name" label="菜单名称" align="center" />
        <el-table-column prop="type" label="级别" align="center" width="60" />
        <el-table-column prop="url" label="菜单url" align="center" />
        <el-table-column prop="icon" label="菜单icon" align="center" />
        <el-table-column prop="sort" label="排序" align="center" width="60" />
        <el-table-column prop="permission" label="权限" align="center" />
        <el-table-column
          prop="createAt"
          label="创建时间"
          align="center"
          width="80"
        >
          <template #default="scope">
            {{ formatTime(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateAt"
          label="更新时间"
          align="center"
          width="80"
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
              @click="handlerEditUser(scope.row)"
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
