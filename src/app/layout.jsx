import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import useNetworkConnection from "hooks/useNetworkConnection"

export default function Layout() {
  const {isOnline} = useNetworkConnection()
  return (
    <div className="sm:h-screen flex flex-col bg-gray-50">
      {isOnline ? null : <div className="text-center py-1.5">Không có kết nối internet!</div>}
      <Header />
      <div className="flex sm:h-[calc(100vh-57px)]">
        <Sidebar />
        <section className="flex-1 overflow-scroll">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
