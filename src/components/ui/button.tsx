// src/components/ui/button.tsx
import React from "react"

type Variant = "default" | "outline"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: Variant
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  // variant에 따른 클래스 분기
  const baseClass = "px-4 py-2 rounded focus:outline-none"
  const variantClass =
    variant === "outline"
      ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
      : "bg-blue-500 text-white hover:bg-blue-700"

  return (
    <button
      {...props}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  )
}

export { Button }
