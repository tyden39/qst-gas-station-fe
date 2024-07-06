import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import {
  FormItem,
  FormLabel
} from "components/ui/form"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { copyToClipboard } from "lib/string"

export default function CompanyInfo({ form }) {
  const formData = form.getValues()
  const { toast } = useToast()

  const handleCopyToken = async (token) => {
    try {
      await copyToClipboard(token)
      toast({
        variant: TOAST.SUCCESS,
        title: "Copy thành công!",
      })
    } catch (error) {
      toast({
        variant: TOAST.DESTRUCTIVE,
        title: `Copy thất bại!`,
        description: error.message
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Thông tin công ty</CardTitle>
      </CardHeader>
      <CardContent>
        <FormItem className="space-y-1.5 grid grid-cols-1">
          <FormLabel>Token</FormLabel>
          <p
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer opacity-50"
            style={{ wordWrap: "break-word" }}
            onClick={() => handleCopyToken(formData?.Company?.token)}
          >
            {formData?.Company?.token}
          </p>
        </FormItem>
      </CardContent>
    </Card>
  )
}
