import LoginPage from "app/login"
import PATH from "./path"
import FuelFilesPage from "app/fuel-files"
import { FuelPage } from "app/fuel"
import { FuelDebugPage } from "app/fuel-debug"
import NotFound from "app/404"
import NoConnection from "app/no-connection"
import NoPermission from "app/no-permission"
import { UserPage } from "app/users"
import UserCreatePage from "app/users/create"
import FuelCreatePage from "app/fuel/create"
import ProfilesPage from "app/profiles"
import { CompanyPage } from "app/companies"
import CompanyCreatePage from "app/companies/create"
import { BranchPage } from "app/branches"
import BranchCreatePage from "app/branches/create"
import { StorePage } from "app/stores"
import StoreCreatePage from "app/stores/create"
import { USER_ROLE } from "constants/user-roles"
import { LoggerPage } from "app/loggers"
import LoggerCreatePage from "app/loggers/create"

const privateRoutes = [
  { path: PATH.HOME, component: FuelPage, role: USER_ROLE.READ_ONLY_STORE },
  { path: PATH.PROFILES, component: ProfilesPage, role: USER_ROLE.READ_ONLY_STORE },

  { path: PATH.FUEL, component: FuelPage, role: USER_ROLE.READ_ONLY_STORE },
  { path: PATH.FUEL_CREATE, component: FuelCreatePage, role: USER_ROLE.STORE },
  { path: PATH.FUEL_EDIT, component: FuelCreatePage, role: USER_ROLE.STORE },
  { path: PATH.FUEL_DEBUG, component: FuelDebugPage, role: USER_ROLE.READ_ONLY_STORE },
  { path: PATH.FUEL_FILES, component: FuelFilesPage, role: USER_ROLE.READ_ONLY_STORE },

  { path: PATH.USER, component: UserPage, role: USER_ROLE.STORE },
  { path: PATH.USER_CREATE, component: UserCreatePage, role: USER_ROLE.STORE },
  { path: PATH.USER_EDIT, component: UserCreatePage, role: USER_ROLE.STORE },

  { path: PATH.COMPANY, component: CompanyPage, role: USER_ROLE.ADMIN },
  { path: PATH.COMPANY_CREATE, component: CompanyCreatePage, role: USER_ROLE.ADMIN },
  { path: PATH.COMPANY_EDIT, component: CompanyCreatePage, role: USER_ROLE.ADMIN },

  { path: PATH.BRANCH, component: BranchPage, role: USER_ROLE.COMPANY },
  { path: PATH.BRANCH_CREATE, component: BranchCreatePage, role: USER_ROLE.COMPANY },
  { path: PATH.BRANCH_EDIT, component: BranchCreatePage, role: USER_ROLE.COMPANY },

  { path: PATH.STORE, component: StorePage, role: USER_ROLE.BRANCH },
  { path: PATH.STORE_CREATE, component: StoreCreatePage, role: USER_ROLE.BRANCH },
  { path: PATH.STORE_EDIT, component: StoreCreatePage, role: USER_ROLE.BRANCH },

  { path: PATH.LOGGER, component: LoggerPage, role: USER_ROLE.STORE },
  { path: PATH.LOGGER_CREATE, component: LoggerCreatePage, role: USER_ROLE.STORE },
  { path: PATH.LOGGER_EDIT, component: LoggerCreatePage, role: USER_ROLE.STORE },
]

const publicRoutes = [
  { path: PATH.LOGIN, component: LoginPage},
  { path: PATH.NOT_FOUND, component: NotFound},
  { path: PATH.NO_CONNECTION, component: NoConnection},
  { path: PATH.NO_PERMISSION, component: NoPermission},
]

export { privateRoutes, publicRoutes }
