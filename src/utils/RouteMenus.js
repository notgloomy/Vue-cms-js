export let firstMenu = null
export const routeToMenus = (userMenu) => {
  // 重要: 动态的添加路由
  // 1.动态获取所有的路由对象，放到数组中
  // * 路由对象要放到独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  // 2.根据菜单去匹配正确的路由
  // 跳转之前要进行动态路由
  const Routes = []
  const files = import.meta.glob('../router/main/**/*.js', {
    eager: true
  })
  // 将加载的对象放到Routes
  for (const key in files) {
    const module = files[key]
    // console.log(module)
    // console.log(module.default)
    Routes.push(module.default)
  }

  const routes = []
  // 根据菜单去匹配正确的路由
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      const route = Routes.find((item) => item.path === submenu.url)
      if (route) {
        // 给route的顶层菜单增加重定向功能(但只需添加一次即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      if (route && !firstMenu) {
        firstMenu = submenu
      }
    }
  }
  return routes
}
