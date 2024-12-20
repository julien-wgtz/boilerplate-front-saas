import * as React from "react"

import { cn } from "@/lib/utils"
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [typeInput, setTypeInput] = React.useState(type)
    const handleTogglePassword = () => {
      if(typeInput === "password") {
        setTypeInput("text")
      } else {
        setTypeInput("password")
      } 
    }

    return (
      <div className={cn("relative flex items-center", className )}>
        <input
          type={typeInput}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          )}
          ref={ref}
          {...props}
        />
        
          {type == "password" && (
            <>
            {typeInput === "password" ? (
              <EyeOpenIcon onClick={handleTogglePassword} className="absolute right-2 cursor-pointer" />
            ) : (
              <EyeClosedIcon onClick={handleTogglePassword} className="absolute right-2 cursor-pointer" />
            )}
            </>
          )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
