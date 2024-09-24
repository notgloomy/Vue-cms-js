<script setup>
import { formatTime } from '@/utils/formatTime.js'
import { useStoryStore } from '@/stores/modules/story.js'
import { useUserStore } from '@/stores/modules/user.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const emits = defineEmits(['CreateClick', 'EditClick'])
const storyStore = useStoryStore()
const userStore = useUserStore()
const { permissions } = storeToRefs(userStore)

// 控制按钮的权限
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
  handleGetStoryList()
}
const handleCurrentChange = () => {
  handleGetStoryList()
}

// 编辑功能相关的逻辑
const handlerLookStory = (formDate) => {
  emits('LookClick', formDate)
}

// 封装获取用户列表
const handleGetStoryList = (searchForm = {}) => {
  if (isSearch === false) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const queryList = { size, offset }
  const endList = { ...queryList, ...searchForm }
  storyStore.getStoryList(endList)
}
handleGetStoryList()
const { storyList, storyCount } = storeToRefs(storyStore)

// 向外暴露获取用户列表
defineExpose({ handleGetStoryList })
</script>

<template>
  <div class="body">
    <div class="body-header">
      <div class="headerText">故事列表</div>
    </div>
    <div class="body-table">
      <el-table :data="storyList" border style="width: 100%">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="title" label="用户名" align="center" />
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatTime(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatTime(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              icon="ChatLineSquare"
              size="small"
              type="primary"
              plain
              text
              style="padding: 0px"
              @click="handlerLookStory(scope.row)"
              v-if="isEdit"
              >查看详情</el-button
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
        :total="storyCount"
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
