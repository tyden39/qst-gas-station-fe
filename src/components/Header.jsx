import { USER_ROLES } from "constants/user-roles"
import { Building, MapPin, Store, User, UserRoundCheck } from "lucide-react"
import { Link } from "react-router-dom"
import PATH from "routers/path"
import useAuth from "zustands/useAuth"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import EllipsisTooltip from "./EllipsisTooltip"

export default function Header() {
  const [user] = useAuth((state) => [state.user])
  const [logout] = useAuth((state) => [state.logout])

  return (
    <header className="w-full flex justify-between h-fit px-6 py-2 border-b bg-primary">
      <div className="relative">
        <img
          className="absolute -top-[7px] -left-[22px]"
          alt="logo"
          src="/logo192.webp"
          width={85}
          height={60}
        />
        <span className="leading-10 text-3xl text-background ml-[68px]">
          QS PECO
        </span>
      </div>

      <div className="flex justify-end items-center gap-7 text-background">
        <span className="flex justify-center items-center gap-1 font-bold">
          <UserRoundCheck className="h-5 w-5" />
          {`${
            USER_ROLES.find((role) => role.value === user?.roles?.[0])?.label
          }`}
        </span>

        {user && user.roles?.length > 0 ? (
          <div className="border-l border-solid h-7" />
        ) : null}
        {user && (user.companyId || user.branchId || user.storeId) ? (
          <>
            <div className="flex justify-end items-center gap-3.5">
              {user && user.companyId ? (
                <span className="flex justify-center items-center gap-1 font-bold max-w-[120px] xl:max-w-[180px] 2xl:max-w-[300px]">
                  <Building className="h-5 w-5" />
                  <EllipsisTooltip
                    className={"flex-1 text-left"}
                    content={user?.companyName}
                  >
                    {user?.companyName}
                  </EllipsisTooltip>
                </span>
              ) : null}
              {user && user.branchId ? (
                <>
                  -
                  <span className="flex justify-center items-center gap-1 font-bold max-w-[120px] xl:max-w-[180px] 2xl:max-w-[300px]">
                    <MapPin className="h-5 w-5" />
                    <EllipsisTooltip
                      className={"flex-1 text-left"}
                      content={user?.branchName}
                    >
                      {user?.branchName}
                    </EllipsisTooltip>
                  </span>
                </>
              ) : null}
              {user && user.storeId ? (
                <>
                  -
                  <span className="flex justify-center items-center gap-1 font-bold max-w-[120px] xl:max-w-[180px] 2xl:max-w-[300px]">
                    <Store className="h-5 w-5" />
                    <EllipsisTooltip
                      className={"flex-1 text-left"}
                      content={user?.storeName}
                    >
                      {user?.storeName}
                    </EllipsisTooltip>
                  </span>
                </>
              ) : null}
            </div>

            <div className="border-l border-solid h-7" />
          </>
        ) : null}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer max-w-[120px] xl:max-w-[180px] 2xl:max-w-[300px]">
              <EllipsisTooltip
                className={"flex-1 text-left"}
                content={user?.username}
              >
                <span className="font-bold">{user?.username}</span>
              </EllipsisTooltip>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <User className="text-black" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to={PATH.PROFILES}>Hồ sơ</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
