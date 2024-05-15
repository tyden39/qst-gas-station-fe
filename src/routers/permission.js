import NoPermission from "app/no-permission";

export const getPermissionPage = (route, user) => {
  if(+user?.isAdmin) return route.component
  return route?.prefix === 'publish' ? route.component : NoPermission
}

// export const checkPermission = (prefix, action, user) => {
//   const { permissions } = user
//   if(+user?.is_admin === 1) return true

//   const subBranch = permissions?.filter(item => item?.feature_code === prefix)

//   if(subBranch?.length > 0) {
//     return !!subBranch?.find(it => +JSON.parse(it.actions_permission)[action] === 1)
//   }
//   return true
// }