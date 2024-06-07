import { BugPlay, Building, File, Fuel, MapPin, Store, User } from "lucide-react"
import PATH from "./path"

const menu = [
  { id: 0, name: "Trạm bơm", path: PATH.FUEL, icon: Fuel },
  { id: 1, name: "Trạm bơm (debug)", path: PATH.FUEL_DEBUG, icon: BugPlay },
  { id: 2, name: "Trạm bơm (file)", path: PATH.FUEL_FILES, icon: File },
  { id: 3, name: "Người dùng", path: PATH.USER, icon: User },
  { id: 4, name: "Công ty", path: PATH.COMPANY, icon: Building },
  { id: 5, name: "Chi nhánh", path: PATH.BRANCH, icon: MapPin },
  { id: 6, name: "Cửa hàng", path: PATH.STORE, icon: Store },
]

export default menu
