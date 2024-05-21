import React, { useState, useRef, useEffect } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip"
import { cn } from "lib/utils"

function EllipsisTooltip({ children, className }) {
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
        <Tooltip disableHoverableContent={showTooltip} delayDuration={300}>
          <TooltipTrigger
            className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
            ref={textRef}
          >
            {children}
          </TooltipTrigger>
          <TooltipContent>{children}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default EllipsisTooltip
