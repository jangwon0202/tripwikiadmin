// src/components/ui/input.tsx
import React from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 ${className}`}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }
