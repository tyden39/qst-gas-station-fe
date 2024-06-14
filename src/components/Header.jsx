import { User } from "lucide-react"
import useAuth from "zustands/useAuth"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Link } from "react-router-dom"
import PATH from "routers/path"

export default function Header() {
  const [user, logout] = useAuth((state) => [state.user, state.logout])

  return (
    <header className="w-full h-fit flex justify-end items-center px-4 py-2 border-b bg-white">
      {/* chọn cty */}
      {/* chọn chi nhánh */}
      {/* chọn cửa hàng */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="">{user?.username}</span>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <User />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link to={PATH.PROFILES}>Hồ sơ</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
