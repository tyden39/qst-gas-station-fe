import { Button } from "components/ui/button"
import { format } from "date-fns"
import { X } from "lucide-react"

export default function FilterTags({ activedFilter, applyFilter, initExtra}) {
  const { companyList, branchList, storeList } = initExtra
  const deleteFilter = (filterName) => {
    const newFilter = { ...activedFilter, [filterName]: null }
    applyFilter(newFilter)
  }

  return (
    <div className="mb-2 -mt-2 flex gap-2 flex-wrap">
      {activedFilter.createdAt ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium text-muted-foreground">Thời gian ghi log:</span>
          {activedFilter.createdAt?.to ? (
            <>
              {format(activedFilter.createdAt?.from, "dd-MM-yyyy")} -{" "}
              {format(activedFilter.createdAt?.to, "dd-MM-yyyy")}
            </>
          ) : (
            format(activedFilter.createdAt?.from, "dd-MM-yyyy")
          )}
          <Button
            variant="ghost"
            className="group p-0.5 h-fit hover:bg-destructive -mr-1"
            onClick={() => deleteFilter("createdAt")}
          >
            <X size={"14"} className="group-hover:stroke-white" />
          </Button>
        </div>
      ) : null}

      {activedFilter.companyId ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium text-muted-foreground">Công ty:</span>
          <span className="">
            {companyList.find((x) => x.id === activedFilter.companyId)?.name}
          </span>
          <Button
            variant="ghost"
            className="group p-0.5 h-fit hover:bg-destructive -mr-1"
            onClick={() => deleteFilter("companyId")}
          >
            <X size={"14"} className="group-hover:stroke-white" />
          </Button>
        </div>
      ) : null}

      {activedFilter.branchId ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium text-muted-foreground">Công ty:</span>
          <span className="">
            {branchList.find((x) => x.id === activedFilter.branchId)?.name}
          </span>
          <Button
            variant="ghost"
            className="group p-0.5 h-fit hover:bg-destructive -mr-1"
            onClick={() => deleteFilter("branchId")}
          >
            <X size={"14"} className="group-hover:stroke-white" />
          </Button>
        </div>
      ) : null}

      {activedFilter.storeId ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium text-muted-foreground">Công ty:</span>
          <span className="">
            {storeList.find((x) => x.id === activedFilter.storeId)?.name}
          </span>
          <Button
            variant="ghost"
            className="group p-0.5 h-fit hover:bg-destructive -mr-1"
            onClick={() => deleteFilter("storeId")}
          >
            <X size={"14"} className="group-hover:stroke-white" />
          </Button>
        </div>
      ) : null}
    </div>
  )
}
