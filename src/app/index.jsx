import { TooltipProvider } from "components/ui/tooltip"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import "./index.css"

export default function App() {
  return (
    <TooltipProvider>
      <div className="flex">
        <Sidebar />
        <section className="w-full ">
          <Header />
        </section>
      </div>
    </TooltipProvider>
  )
}
