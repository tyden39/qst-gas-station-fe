import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { cn } from "lib/utils"
import { Fuel, Home } from "lucide-react"
import { useStore } from "../zustand/store"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent } from "./ui/tooltip"

const menu = [
  { id: 0, name: "Trạm bơm", path: "/fuel", icon: Fuel },
  { id: 1, name: "Trạm bơm (debug)", path: "/fuel", icon: Fuel },
  { id: 2, name: "Trạm bơm (file)", path: "/fuel", icon: Fuel },
]

const Sidebar = () => {
  const collapsed = useStore((state) => state.collapsed)

  return (
    <nav
      className={cn(
        "h-screen overflow-y-scroll border-r transition-all",
        collapsed ? "w-12" : "w-64"
      )}
    >
      <div className="p-2 border-b text-center">
        <span className="leading-10 text-3xl">Gas Station</span>
      </div>
      <div className="p-2 space-y-2">
        {menu.map((item) => 
          collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={item.path}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              className={cn(
                "w-full justify-start",
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.name}</span>
            </Button>
          )
        )}
      </div>
    </nav>
  )
}

export default Sidebar
