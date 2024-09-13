import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react"
import useNetworkConnection from "hooks/useNetworkConnection"

export default function Layout() {
  const {isOnline} = useNetworkConnection()
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
  
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
  
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <div className="sm:h-screen flex flex-col bg-gray-50">
      {isOnline ? null : <div className="text-center py-1.5">Không có kết nối internet!</div>}
      <Header />
      <div className="flex" style={{height: viewportHeight - 57}}>
        <Sidebar />
        <section className="flex-1 overflow-scroll">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
