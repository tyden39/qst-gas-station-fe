import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react"

export default function Layout() {
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
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex" style={{height: viewportHeight - 57}}>
        <Sidebar />
        <section className="p-4 flex-1 overflow-scroll">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
