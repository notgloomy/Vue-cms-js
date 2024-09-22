<!-- eslint-disable no-undef -->
<script setup>
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const quitHandler = () => {
  userStore.resetToken()
  router.push('/login')
  ElMessage.success('退出系统成功')
}
</script>

<template>
  <div class="header-info">
    <!-- 操作小图标 -->
    <div class="icon-items">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <div class="dot"></div>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <!-- 个人信息 -->
    <div class="user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :size="30"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
          {{ userStore.userName }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><CircleClose /></el-icon>
              <span @click="quitHandler">退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
}
.header-info {
  display: flex;
  align-items: center;
  .icon-items {
    display: inline-flex;
    margin-right: 10px;
    span {
      display: flex;
      width: 40px;
      height: 35px;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;
      &:hover {
        background-color: #f2f2f2;
      }
    }
    .dot {
      position: absolute;
      top: 7px;
      right: 8px;
      width: 5px;
      height: 5px;
      background-color: red;
      border-radius: 50%;
    }
  }
  .user-info {
    .el-avatar {
      margin-right: 5px;
    }
    .el-dropdown-link {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
