import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2bc196]/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#2bc196] text-[#002443] shadow-lg shadow-[#2bc196]/20 hover:bg-[#5cf7cf] hover:shadow-[#2bc196]/30",
        destructive:
          "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50",
        outline:
          "border border-[#2bc196]/30 bg-transparent text-[#2bc196] hover:bg-[#2bc196]/10 hover:border-[#2bc196]/50",
        secondary:
          "bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:border-white/20",
        ghost: "text-white/70 hover:bg-[#2bc196]/10 hover:text-[#2bc196]",
        link: "text-[#2bc196] underline-offset-4 hover:underline hover:text-[#5cf7cf]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }