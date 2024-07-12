import { Button } from "components/ui/button"
import { format } from "date-fns"
import { X } from "lucide-react"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "./constant"

export default function FilterTags({ activedFilter, applyFilter, initExtra }) {
  const { companyList, branchList, storeList } = initExtra
  const deleteFilter = (filterName) => {
    const newFilter = activedFilter
      ? { ...activedFilter, [filterName]: null }
      : undefined
    applyFilter(newFilter ? { newFilter } : undefined)
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {activedFilter?.billDate ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium text-muted-foreground">
            Thời gian ghi log:
          </span>
          <span className="text-blue-600">
            {activedFilter?.billDate?.to ? (
              <>
                {format(activedFilter?.billDate?.from, "dd-MM-yyyy")} -{" "}
                {format(activedFilter?.billDate?.to, "dd-MM-yyyy")}
              </>
            ) : (
              format(activedFilter?.billDate?.from, "dd-MM-yyyy")
            )}
          </span>
          <Button
            variant="ghost"
            className="group p-0.5 h-fit hover:bg-destructive -mr-1"
            onClick={() => deleteFilter("billDate")}
          >
            <X size={"14"} className="group-hover:stroke-white" />
          </Button>
        </div>
      ) : null}

      {activedFilter?.billType ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium  text-muted-foreground">
            Loại hóa đơn:
          </span>
          {BILL_TYPES.find((x) => x.value === activedFilter?.billType)?.label}
          <Button
            variant="ghost"
            className="group p-0.5 h-fit hover:bg-destructive -mr-1"
            onClick={() => deleteFilter("billType")}
          >
            <X size={"14"} className="group-hover:stroke-white" />
          </Button>
        </div>
      ) : null}

      {activedFilter?.fuelType ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium  text-muted-foreground">
            Loại nhiên liệu:
          </span>
          <span className="">
            {FUEL_TYPE.find((x) => x.value === activedFilter?.fuelType)?.label}
          </span>
          <Button
            variant="ghost"
            className="group p-0.5 h-fit hover:bg-destructive -mr-1"
            onClick={() => deleteFilter("fuelType")}
          >
            <X size={"14"} className="group-hover:stroke-white" />
          </Button>
        </div>
      ) : null}

      {activedFilter?.pumpId ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium  text-muted-foreground">
            Mã vòi bơm:
          </span>
          <span className="">
            {PUMP_ID.find((x) => x.value === activedFilter?.pumpId)?.label}
          </span>
          <Button
            variant="ghost"
            className="group p-0.5 h-fit hover:bg-destructive -mr-1"
            onClick={() => deleteFilter("pumpId")}
          >
            <X size={"14"} className="group-hover:stroke-white" />
          </Button>
        </div>
      ) : null}

      {activedFilter?.companyId ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium  text-muted-foreground">Công ty:</span>
          <span className="">
            {companyList.find((x) => x.id === activedFilter?.companyId)?.name}
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

      {activedFilter?.branchId ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium  text-muted-foreground">Công ty:</span>
          <span className="">
            {branchList.find((x) => x.id === activedFilter?.branchId)?.name}
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

      {activedFilter?.storeId ? (
        <div className="text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium  text-muted-foreground">Công ty:</span>
          <span className="">
            {storeList.find((x) => x.id === activedFilter?.storeId)?.name}
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
