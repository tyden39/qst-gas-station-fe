import menu from "routers/menu"

export const getActiveMenu = (pathname) => {
  return menu.find(item => item.path === pathname)?.name ?? ''
}