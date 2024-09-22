// 根据路径匹配面包屑
export const routeToBread = (path, menus) => {
  const breadCrumb = []
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadCrumb.push({ name: menu.name, path: menu.url })
        breadCrumb.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadCrumb
}
