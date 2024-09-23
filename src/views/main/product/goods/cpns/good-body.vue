<script setup>
import { formatTime } from '@/utils/formatTime.js'
import { ReqDeletegoods } from '@/apis/goods.js'
import { useGoodStore } from '@/stores/modules/goods'
import { useUserStore } from '@/stores/modules/user.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const emits = defineEmits(['CreateClick', 'EditClick'])
const userStore = useUserStore()
const goodStore = useGoodStore()
const { permissions } = storeToRefs(userStore)

// 控制按钮的权限
const isCreate = permissions.value.find((item) =>
  item.includes('system:users:create')
)
const isDelete = permissions.value.find((item) =>
  item.includes('system:users:delete')
)
const isEdit = permissions.value.find((item) =>
  item.includes('system:users:update')
)
const isSearch = permissions.value.find((item) =>
  item.includes('system:users:query')
)

// 页面相关的逻辑
const currentPage = ref(1)
const pageSize = ref(10)
const handleSizeChange = () => {
  handleGetGoodList()
}
const handleCurrentChange = () => {
  handleGetGoodList()
}

// 删除相关的逻辑
const handlerDelete = async (id) => {
  // 删除逻辑操作
  await ReqDeletegoods(id)

  // 重新请求新的数据
  handleGetGoodList()
}

// 新增功能相关的逻辑
const handlerCreateUser = () => {
  emits('CreateClick')
}
// 编辑功能相关的逻辑
const handlerEditUser = (formDate) => {
  emits('EditClick', formDate)
}

// 封装获取用户列表
const handleGetGoodList = (searchForm = {}) => {
  if (isSearch === false) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const queryList = { size, offset }
  const endList = { ...queryList, ...searchForm }
  goodStore.getGoodList(endList)
}
handleGetGoodList()
const { goodList, goodCount } = storeToRefs(goodStore)

// 向外暴露获取用户列表
defineExpose({ handleGetGoodList })
</script>

<template>
  <div class="body">
    <div class="body-header">
      <div class="headerText">商品列表</div>
      <el-button type="primary" @click="handlerCreateUser" v-if="isCreate"
        >新建商品</el-button
      >
    </div>
    <div class="body-table">
      <el-table :data="goodList" border style="width: 100%">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          width="150"
        />
        <el-table-column prop="imgUrl" label="图片" align="center">
          <template #default="scope">
            <img :src="scope.row.imgUrl" />
          </template>
        </el-table-column>
        <el-table-column
          prop="inventoryCount"
          label="库存数量"
          align="center"
        />
        <el-table-column prop="newPrice" label="销售价格" align="center" />
        <el-table-column prop="saleCount" label="销售数量" align="center" />
        <el-table-column prop="favorCount" label="收藏数量" align="center" />
        <el-table-column prop="address" label="产地" align="center" />
        <el-table-column
          prop="createAt"
          label="创建时间"
          align="center"
          width="150"
        >
          <template #default="scope">
            {{ formatTime(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateAt"
          label="更新时间"
          align="center"
          width="150"
        >
          <template #default="scope">
            {{ formatTime(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120">
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
    <div class="body-page">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="goodCount"
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
  .body-table {
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .body-page {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
