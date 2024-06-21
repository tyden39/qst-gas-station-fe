import { Card, CardContent } from "components/ui/card"
import { Skeleton } from "components/ui/skeleton"

export default function SkeletonForm() {
  return (
    <>
      <Card className="w-full">
        <CardContent className="grid w-full items-center gap-4 pt-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2 p-4 space-x-4 text-right flex justify-end">
        <Skeleton className="h-[40px] w-[60px]" />
        <Skeleton className="h-[40px] w-[60px]" />
      </Card>
    </>
  )
}
