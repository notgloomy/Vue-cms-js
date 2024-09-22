import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ReqLogin, ReqGetuserInfo, ReqGetuserMenu } from '@/apis/user'
import router from '@/router'
import { routeToMenus } from '@/utils/RouteMenus'
import { mapMenuListToPermission } from '@/utils/map-menus.js'
export const useUserStore = defineStore(
  'user',
  () => {
    // 登录过后会获得token,userName,id
    const token = ref('')
    const userName = ref('')
    const id = ref(-1)
    // name与password是为了做记住密码操作相关
    const name = ref('')
    const password = ref('')

    // userInfo存储用户信息
    // userMenu存储用户权限菜单
    const userMenu = ref([])
    const userInfo = ref({})

    // permissions存储用户按钮权限
    const permissions = ref([])
    // 退出登录清空token,userName,id,name,password
    const resetToken = () => {
      token.value = ''
      userName.value = ''
      id.value = -1
      name.value = ''
      password.value = ''
      userMenu.value = ''
      userInfo.value = ''
    }
    // 取消记住密码后清空name与password
    const resetName = () => {
      name.value = ''
    }
    const resetPassword = () => {
      password.value = ''
    }
    // 登录操作
    const getLoginAccount = async (account) => {
      const res = await ReqLogin(account)
      // 进行信息存储
      id.value = res.data.data.id
      token.value = res.data.data.token
      userName.value = res.data.data.name

      // 获取用户信息操作
      const userRes = await ReqGetuserInfo(id.value)
      userInfo.value = userRes.data

      // 根据用户信息中的权限role中的id来进行获取用户的权限菜单
      const menuRes = await ReqGetuserMenu(userInfo.value.data.role.id)
      userMenu.value = menuRes.data.data

      permissions.value = mapMenuListToPermission(userMenu.value)
      const routes = routeToMenus(userMenu.value)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // console.log(routes)
      // 跳转页面
      router.push('/main')
    }
    // 当用户进行刷新时默认加载数据
    const freshAction = () => {
      if (token.value && userInfo.value && userMenu.value) {
        const routes = routeToMenus(userMenu.value)
        routes.forEach((route) => {
          router.addRoute('main', route)
        })
        permissions.value = mapMenuListToPermission(userMenu.value)
        console.log(Array.isArray(permissions.value))
      }
    }
    return {
      token,
      resetToken,
      userName,
      id,
      permissions,
      getLoginAccount,
      name,
      password,
      resetName,
      resetPassword,
      userInfo,
      userMenu,
      freshAction
    }
  },
  {
    persist: true
  }
)
