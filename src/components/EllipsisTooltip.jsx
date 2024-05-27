import React, { useState, useRef, useEffect } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip"
import { cn } from "lib/utils"

function EllipsisTooltip({ children, className, content }) {
  const [open, setOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const textRef = useRef(null)

  useEffect(() => {
    const textElement = textRef.current
    if (textElement && textElement.offsetWidth < textElement.scrollWidth) {
      setShowTooltip(true)
    } else {
      setShowTooltip(false)
    }
  }, [children])

  return (
    <div
      className={cn(
        "overflow-hidden text-ellipsis whitespace-nowrap",
        className
      )}
    >
      <TooltipProvider>
        <Tooltip open={open} delayDuration={300}>
          <TooltipTrigger asChild>
            <div
              className="w-full overflow-hidden text-ellipsis whitespace-nowrap hover:cursor-pointer"
              onMouseEnter={() => {if (showTooltip) setOpen(true)}}
              onMouseLeave={() => {if (showTooltip) setOpen(false)}}
              ref={textRef}
            >
              {children}
            </div>
          </TooltipTrigger>
          <TooltipContent>{content || children}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default EllipsisTooltip
