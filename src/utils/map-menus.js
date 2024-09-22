/**
 * 菜单映射到id的列表
 */
export const mapMenuListToIds = (menuList) => {
  const ids = []

  const recurseGetId = (menus) => {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}
/**
 * 从菜单映射到按钮的权限
 */
export const mapMenuListToPermission = (menuList) => {
  const permissions = []
  for (const menu of menuList) {
    for (const submenu of menu.children) {
      if (submenu.children) {
        for (const endmenu of submenu.children) {
          permissions.push(endmenu.permission)
        }
      }
    }
  }
  return permissions
}
