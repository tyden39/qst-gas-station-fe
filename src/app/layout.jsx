import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import "./index.css"

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <section className="flex-1 flex flex-col">
        <Header />
        <div className="p-2 flex-1">
          <Outlet />
        </div>
      </section>
    </div>
  )
}
