import { useAppNavigation } from "zustands/useAppNavigation"

export default function FuelFilesPage() {
  const activedMenu = useAppNavigation(state => state.activedMenu)
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-4xl leading-normal">{activedMenu.name}</h1>

      <div className="flex-1 flex justify-center items-center italic text-slate-300 text-2xl">
        Tính năng đang phát triển
      </div>
    </div>
  )
}