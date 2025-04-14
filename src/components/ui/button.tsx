// src/components/ui/button.tsx
import React from "react"

// Button 컴포넌트 인터페이스 확장
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none ${className}`}
    >
      {children}
    </button>
  )
}

export { Button }
