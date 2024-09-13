import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { cn } from "lib/utils"
import { Home } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import menu from "routers/menu"
import { useAppNavigation } from "zustands/useAppNavigation"
import useAuth from "zustands/useAuth"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent } from "./ui/tooltip"
import { Separator } from "./ui/separator"
import useSidebarMobile from "zustands/useSidebarMobile"

const Sidebar = ({className}) => {
  const [toggle, setToggle] = useSidebarMobile((state) => [state.toggle, state.setToggle])
  const [collapsed, setActivedMenu] = useAppNavigation((state) => [
    state.collapsed,
    state.setActivedMenu,
  ])
  const [user] = useAuth((state) => [state.user])
  const { pathname } = useLocation()
  const navigation = useNavigate()

  const handleNavigate = (item) => {
    if (pathname === item.path) return
    navigation(item.path)
    setActivedMenu(item)
    setToggle()
  }

  return (
    <>
      {toggle && <div className="sm:hidden absolute w-screen h-full bg-black opacity-30 z-50" onClick={setToggle} />}

      <nav
        className={cn(
          "border-r transition-all bg-white",
          collapsed ? "w-12" : "w-64",
          "max-sm:absolute max-sm:z-50 max-sm:h-full max-sm:transition-all",
          toggle ? "max-sm:translate-x-0" : "max-sm:-translate-x-full max-sm:overflow-hidden",
          className
        )}
      >
        <div className="p-2 space-y-2">
          {menu
            .filter(
              (item) => item.role === "public" || user?.roles.includes(item.role)
            )
            .map((item) =>
              item.name === "seperate" ? (
                <Separator key={'seperate-menu'} orientation="horizontal" />
              ) : collapsed ? (
                <Tooltip key={`collapsed-menu-${item.id}`}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <Home className="h-5 w-5" />
                      <span className="sr-only">{item.name}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.name}</TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  key={`menu-${item.id}`}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.path &&
                      "bg-[#A4C9FE] text-[#001C39] hover:bg-[#A4C9FE] hover:text-[#001C39]"
                  )}
                  variant={pathname === item.path ? "secondary" : "ghost"}
                  onClick={() => handleNavigate(item)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              )
            )}
        </div>
      </nav>
    </>
  )
}

export default Sidebar
