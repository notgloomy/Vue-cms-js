import instance from '@/service/request'
// 与用户有关的接口

// 用户登录接口
export const ReqLogin = ({ name, password }) => {
  return instance.post('/login', { name, password })
}

// 获取用户所有信息
export const ReqGetuserInfo = (id) => {
  return instance.get(`/users/${id}`)
}

// 获取用户权限菜单
export const ReqGetuserMenu = (id) => {
  return instance.get(`/role/${id}/menu`)
}

// 查询用户列表
export const ReqGetuserList = (queryList) => {
  return instance.post('/users/list', queryList)
}

// 删除用户
export const ReqDeluserList = (id) => {
  return instance.delete(`/users/${id}`)
}

// 创建用户
export const ReqCreateUser = (userObject) => {
  return instance.post('/users', userObject)
}

// 编辑用户
export const ReqEditUser = (id, userInfo) => {
  return instance.patch(`/users/${id}`, userInfo)
}
