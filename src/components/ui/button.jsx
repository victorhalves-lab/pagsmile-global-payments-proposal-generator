import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2bc196]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#002443] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#2bc196] to-[#25a882] text-[#002443] shadow-lg shadow-[#2bc196]/25 hover:from-[#5cf7cf] hover:to-[#2bc196] hover:shadow-xl hover:shadow-[#2bc196]/35 hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border border-red-500/30 hover:from-red-500/30 hover:to-red-600/30 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10",
        outline:
          "border border-[#2bc196]/40 bg-[#2bc196]/5 text-[#2bc196] hover:bg-[#2bc196]/15 hover:border-[#2bc196]/60 hover:shadow-lg hover:shadow-[#2bc196]/10",
        secondary:
          "bg-white/[0.08] text-white/90 border border-white/[0.1] hover:bg-white/[0.15] hover:border-white/20 hover:text-white",
        ghost: "text-white/60 hover:bg-white/[0.08] hover:text-[#2bc196]",
        link: "text-[#2bc196] underline-offset-4 hover:underline hover:text-[#5cf7cf]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-xl",
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