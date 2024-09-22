import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  ReqGetDepartmentList,
  ReqGetRoleList,
  ReqGetMenuList
} from '@/apis/system'
export const useSystemStore = defineStore('system', () => {
  // 部门
  const departmentList = ref([])
  // 职位
  const roleList = ref([])
  // 菜单
  const menuList = ref([])
  // 部门总数
  const deTotal = ref(0)
  // 角色总数
  const roleTotal = ref(0)
  // 获取部门列表
  const getDepartmentList = async (queryList) => {
    const res = await ReqGetDepartmentList(queryList)
    departmentList.value = res.data.data.list
    deTotal.value = res.data.data.totalCount
  }
  // 获取角色列表
  const getRoleList = async (queryList) => {
    const res = await ReqGetRoleList(queryList)
    roleList.value = res.data.data.list
    roleTotal.value = res.data.data.totalCount
  }
  // 获取菜单列表
  const getMenuList = async () => {
    const res = await ReqGetMenuList()
    menuList.value = res.data.data.list
  }
  console.log('System store initialized')
  // 检查是否有其他地方自动调用 getDepartmentList
  // 例如，确保没有在 store 初始化时自动调用 getDepartmentList
  return {
    departmentList,
    roleList,
    menuList,
    getDepartmentList,
    getRoleList,
    getMenuList,
    deTotal,
    roleTotal
  }
})
