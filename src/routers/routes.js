import LoginPage from "app/login"
import PATH from "./path"
import FuelFilesPage from "app/fuel-files"
import { FuelPage } from "app/fuel"
import { FuelDebugPage } from "app/fuel-debug"
import NotFound from "app/404"
import NoConnection from "app/no-connection"
import NoPermission from "app/no-permission"

const privateRoutes = [
  { path: PATH.FUEL, component: FuelPage },
  { path: PATH.FUEL_DEBUG, component: FuelDebugPage },
  { path: PATH.FUEL_FILES, component: FuelFilesPage },
]

const publicRoutes = [
  { path: PATH.LOGIN, component: LoginPage },
  { path: PATH.NOT_FOUND, component: NotFound },
  { path: PATH.NO_CONNECTION, component: NoConnection },
  { path: PATH.NO_PERMISSION, component: NoPermission },
]

export { privateRoutes, publicRoutes }
