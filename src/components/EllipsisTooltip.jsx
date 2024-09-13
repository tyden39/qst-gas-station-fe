import React, { useState, useRef, useEffect } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip"
import { cn } from "lib/utils"

function EllipsisTooltip({ children, className, content, type }) {
  const [open, setOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const textRef = useRef(null)

  useEffect(() => {
    const textElement = textRef.current

    if (type === 'vertical') {
      if (textElement && textElement.offsetHeight < textElement.scrollHeight) {
        setShowTooltip(true)
      } else {
        setShowTooltip(false)
      }
    } else {
      if (textElement && textElement.offsetWidth < textElement.scrollWidth) {
        setShowTooltip(true)
      } else {
        setShowTooltip(false)
      }
    }
  }, [children, type])

  return (
    <div
      className={cn(
        "overflow-hidden text-ellipsis",
        type === 'vertical' ? 'ellipsis-two-line' : 'whitespace-nowrap',
        className
      )}
    >
      <TooltipProvider>
        <Tooltip open={open} delayDuration={300}>
          <TooltipTrigger asChild>
            <div
              className={cn("w-full overflow-hidden text-ellipsis", type === 'vertical' ? 'ellipsis-two-line' : 'whitespace-nowrap', showTooltip ? "hover:cursor-pointer" : "")}
              onMouseEnter={() => {if (showTooltip) setOpen(true)}}
              onMouseLeave={() => {if (showTooltip) setOpen(false)}}
              ref={textRef}
            >
              {children}
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-[500px]">{content || children}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default EllipsisTooltip
