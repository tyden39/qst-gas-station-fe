import { BugPlay, Building, File, Fuel, MapPin, Store, User } from "lucide-react"
import PATH from "./path"

const menu = [
  { id: 0, name: "Trạm bơm", path: PATH.FUEL, icon: Fuel, role: 'public'},
  { id: 1, name: "Trạm bơm (debug)", path: PATH.FUEL_DEBUG, icon: BugPlay, role: 'public'},
  { id: 2, name: "Trạm bơm (file)", path: PATH.FUEL_FILES, icon: File, role: 'public'},
  { id: 4, name: "Công ty", path: PATH.COMPANY, icon: Building, role: '000'},
  { id: 5, name: "Chi nhánh", path: PATH.BRANCH, icon: MapPin, role: '001'},
  { id: 6, name: "Cửa hàng", path: PATH.STORE, icon: Store, role: '002'},
  { id: 3, name: "Người dùng", path: PATH.USER, icon: User, role: '003'},
]

export default menu
