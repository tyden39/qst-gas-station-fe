import NoPermission from "app/no-permission"

export const getPermissionPage = (route, user) => {
  if (user?.roles?.includes(route.role))
    return route.component
  return NoPermission
}
