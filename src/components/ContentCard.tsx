import React, { MouseEvent } from "react"
import { Button } from "./ui/button"

type ContentCardProps = {
  content: {
    title: string
    firstimage?: string
  }
  onClick: () => void
  onDelete: () => void
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onClick, onDelete }) => {
  // stopPropagation을 위한 핸들러 타입 명시
  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <div
      className="border rounded shadow hover:shadow-lg p-2 cursor-pointer relative"
      onClick={onClick}
    >
      {content.firstimage && (
        <img
          src={content.firstimage}
          alt={content.title}
          className="w-full h-40 object-cover rounded"
        />
      )}
      <h3 className="mt-2 text-sm font-semibold">{content.title}</h3>
      <Button
        className="absolute top-2 right-2 bg-red-500 text-white text-xs"
        onClick={handleDeleteClick}
      >
        삭제
      </Button>
    </div>
  )
}

export default ContentCard
