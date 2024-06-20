import { Button } from "components/ui/button"
import { format } from "date-fns"
import { X } from "lucide-react"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "./constant"

export default function FilterTags({ activedFilter, applyFilter, companyList, branchList, storeList }) {
  const deleteFilter = (filterName) => {
    const newFilter = { ...activedFilter, [filterName]: null }
    applyFilter(newFilter)
  }

  return (
    <div className="mb-2 -mt-2 flex gap-2 flex-wrap">
      {activedFilter.billDate ? (
        <div className="border border-solid bg-primary-foreground text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium">Thời gian ghi log:</span>
          {activedFilter.billDate?.to ? (
            <>
              {format(activedFilter.billDate?.from, "dd-MM-yyyy")} -{" "}
              {format(activedFilter.billDate?.to, "dd-MM-yyyy")}
            </>
          ) : (
            format(activedFilter.billDate?.from, "dd-MM-yyyy")
          )}
          <Button
            variant="ghost"
            className="group p-0.5 h-fit hover:bg-destructive -mr-1"
            onClick={() => deleteFilter("billDate")}
          >
            <X size={"14"} className="group-hover:stroke-white" />
          </Button>
        </div>
      ) : null}

      {activedFilter.billType ? (
        <div className="border border-solid bg-primary-foreground text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium">Loại hóa đơn:</span>
          {BILL_TYPES.find((x) => x.value === activedFilter.billType)?.label}
          <Button
            variant="ghost"
            className="group p-0.5 h-fit hover:bg-destructive -mr-1"
            onClick={() => deleteFilter("billType")}
          >
            <X size={"14"} className="group-hover:stroke-white" />
          </Button>
        </div>
      ) : null}

      {activedFilter.fuelType ? (
        <div className="border border-solid bg-primary-foreground text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium">Loại nhiên liệu:</span>
          <span className="">
            {FUEL_TYPE.find((x) => x.value === activedFilter.fuelType)?.label}
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

      {activedFilter.pumpId ? (
        <div className="border border-solid bg-primary-foreground text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium">Mã vòi bơm:</span>
          <span className="">
            {PUMP_ID.find((x) => x.value === activedFilter.pumpId)?.label}
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

      {activedFilter.companyId ? (
        <div className="border border-solid bg-primary-foreground text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium">Công ty:</span>
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
        <div className="border border-solid bg-primary-foreground text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium">Công ty:</span>
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
        <div className="border border-solid bg-primary-foreground text-sm py-1 px-2 rounded w-fit flex items-center gap-1">
          <span className="font-medium">Công ty:</span>
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
