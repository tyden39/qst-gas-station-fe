
import { getActiveMenu } from "lib/url"
import { useLocation } from "react-router-dom"

export function FuelDebugPage() {
  const location = useLocation()
  const activeMenuName = getActiveMenu(location.pathname)

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-4xl leading-normal">{activeMenuName}</h1>

      <div className="flex-1 flex justify-center items-center italic text-slate-300 text-2xl">
        Tính năng đang phát triển
      </div>
    </div>
  )
}
