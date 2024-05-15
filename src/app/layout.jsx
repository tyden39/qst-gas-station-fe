import { TooltipProvider } from "components/ui/tooltip"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import "./index.css"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <TooltipProvider>
      <div className="flex">
        <Sidebar />
        <section className="flex-1">
          <Header />
          <div className="p-2">
            <Outlet />
          </div>
        </section>
      </div>
    </TooltipProvider>
  )
}
