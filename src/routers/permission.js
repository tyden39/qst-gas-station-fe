import NoPermission from "app/no-permission"
import PATH from "./path"

export const getPermissionPage = (route, user) => {
  if (
    user?.roles === "004" &&
    (route.path.includes(PATH.FUEL_CREATE) ||
      route.path.includes(PATH.FUEL_EDIT) ||
      route.path.includes(PATH.USER))
  )
    return NoPermission
  return route.component
}
