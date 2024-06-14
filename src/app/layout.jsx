import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import "./index.css"

export default function Layout() {
  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 h-screen flex flex-col">
        <Header />
        <section className="p-4 flex-1 overflow-scroll">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
