<!-- eslint-disable no-undef -->
<script setup>
import { useUserStore } from '@/stores/modules/user'
import { ref } from 'vue'
const userStore = useUserStore()
const isSelected = ref(false)

// 1.定义account数据
const account = ref({
  name: userStore.name ?? '',
  password: userStore.password ?? ''
})
// 2.定义校验规则
const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: '请输入正确格式的用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '请输入正确格式的密码', trigger: 'blur' }
  ]
}
// 登录前要进行预校验
const formRef = ref()

// 登录时的相关操作
const loginHandler = async () => {
  // router.push('/main')
  formRef.value.validate((valid) => {
    if (valid) {
      userStore.getLoginAccount(account.value)
      // eslint-disable-next-line no-undef
      ElMessage({
        message: '登录成功',
        type: 'success'
      })

      // 判断是否选择了记住密码，如果是，就将账号跟密码存到仓库中
      // 如果不是，就将仓库里已存的账号密码的清空
      if (isSelected.value) {
        userStore.name = account.value.name
        userStore.password = account.value.password
      } else {
        userStore.resetName()
        userStore.resetPassword()
      }
    } else {
      ElMessage.error('请输入正确格式后再进行操作')
    }
  })

  // 记住密码操作
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <div class="header">
        <h1>弘源后台管理系统</h1>
      </div>
      <div class="body">
        <el-tabs type="border-card" stretch>
          <el-tab-pane>
            <template #label>
              <el-icon><User /></el-icon>
              <span>账号登录</span>
            </template>
            <el-form
              label-width="60px"
              size="large"
              :model="account"
              :rules="rules"
              ref="formRef"
            >
              <el-form-item label="账号" prop="name">
                <el-input v-model="account.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="account.password" show-password></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </template>
            <el-form size="large" label-width="60px">
              <el-form-item label="手机号">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <div class="certify">
                  <el-input></el-input>
                  <el-button type="primary" class="btn">获取验证码</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="footer">
        <div class="choose">
          <el-checkbox label="记住密码" v-model="isSelected" />
          <el-link type="primary">忘记密码</el-link>
        </div>
        <el-button type="primary" @click="loginHandler">立即登录</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-page {
  width: 100%;
  height: 695px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/img/login-bg.svg');
  .login-box {
    width: 400px;
    .header {
      width: 380px;
      text-align: center;
      padding: 15px;
    }
    .body {
      width: 380px;
    }
    .footer {
      .choose {
        width: 380px;
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
      }
      .el-button {
        width: 380px;
        height: 40px;
      }
    }
  }
}
.certify {
  display: flex;
}
.btn {
  margin-left: 10px;
}
</style>
