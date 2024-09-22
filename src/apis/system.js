import instance from '@/service/request'
// 与系统有关的所有接口

/**
 * 与部门有关的接口
 */
// 获取所有的部门
export const ReqGetDepartmentList = (queryList) => {
  return instance.post('/department/list', queryList)
}

// 创建部门
export const ReqCreateDepartment = (queryList) => {
  return instance.post('/department', queryList)
}

// 删除部门
export const ReqDeleteDepartment = (id) => {
  return instance.delete(`/department/${id}`)
}

// 编辑部门
export const ReqEditDepartment = (id, queryList) => {
  return instance.patch(`/department/${id}`, queryList)
}

/**
 * 与菜单有关的接口
 */
// 获取菜单列表
export const ReqGetMenuList = () => {
  return instance.post('/menu/list')
}

/**
 * 与角色有关的接口
 */
// 获取所有的角色
export const ReqGetRoleList = (queryList) => {
  return instance.post('/role/list', queryList)
}
// 创建新的角色
export const ReqCreateRole = (queryList) => {
  return instance.post('/role', queryList)
}
// 删除新的角色
export const ReqDelRole = (id) => {
  return instance.delete(`/role/${id}`)
}
// 编辑新的角色
export const ReqEditRole = (id, queryList) => {
  return instance.patch(`/role/${id}`, queryList)
}
