import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import "./index.css"

export default function Layout() {
  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <section className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </section>
    </div>
  )
}
