import Loading from "components/layout/loading/Loading"
import { Toaster } from "components/ui/toaster"
import { TooltipProvider } from "components/ui/tooltip"
import { Outlet } from "react-router-dom"

export default function Providers() {
  return (
    <TooltipProvider>
      <Outlet />
      <Loading />
      <Toaster />
    </TooltipProvider>
  )
}
