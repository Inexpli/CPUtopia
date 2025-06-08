import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { FormInputProps } from "@/types/ui"

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label
          htmlFor={id}
          className="block text-sm font-medium"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            "bg-background mt-1 w-full rounded-md border p-2",
            "focus:ring-primary focus:ring-2 focus:outline-none",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)
