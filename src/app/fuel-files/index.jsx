import { useAppNavigation } from "zustands/useAppNavigation"

export default function FuelFilesPage() {
  const activedMenu = useAppNavigation(state => state.activedMenu)
  return (
    <div className="w-full">
      <h1 className="text-4xl leading-normal">{activedMenu.name}</h1>
      
    </div>
  )
}