// src/components/ui/button.tsx
import React from "react"

// Button 컴포넌트
type ButtonProps = {
  onClick: () => void // 버튼 클릭 시 호출될 함수
  children: React.ReactNode // 버튼 안에 들어갈 내용
  className?: string // 추가적인 클래스 이름을 받을 수 있는 옵션
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none ${className}`}
    >
      {children}
    </button>
  )
}

export { Button }
