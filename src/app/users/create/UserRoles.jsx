import { TooltipArrow } from "@radix-ui/react-tooltip"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip"
import { USER_ROLES } from "constants/user-roles"
import { CircleHelp } from "lucide-react"

export default function UserRoles({ form }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vai trò người dùng</CardTitle>
        <CardDescription>Chọn một trong các vai trò:</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-1 w-full items-center gap-8"
                >
                  {USER_ROLES.map((item) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel>{item.label}</FormLabel>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <CircleHelp size={16} className="cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
