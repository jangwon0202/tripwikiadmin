// src/pages/Contents.tsx
import { useEffect, useState } from "react"
import { getDatabase, ref, onValue, remove, set, update } from "firebase/database"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import ContentCard from "../components/ContentCard"
import ContentDetailModal from "../components/ContentDetailModal"

type ContentType = {
  contentId: string
  contentTypeId: string
  title: string
  firstimage?: string
  [key: string]: any
}

const Contents = () => {
  const [contents, setContents] = useState<ContentType[]>([])
  const [selectedContent, setSelectedContent] = useState<ContentType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const db = getDatabase()

  useEffect(() => {
    const contentsRef = ref(db, "tour_data/contents")
    onValue(contentsRef, (snapshot) => {
      const data = snapshot.val()
      const loaded: ContentType[] = []
      for (const typeId in data) {
        for (const contentId in data[typeId]) {
          loaded.push({
            contentId,
            contentTypeId: typeId,
            ...data[typeId][contentId],
          })
        }
      }
      setContents(loaded)
    })
  }, [])

  const filtered = contents.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteContent = (content: ContentType) => {
    remove(ref(db, `tour_data/contents/${content.contentTypeId}/${content.contentId}`))
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">관광지 관리</h2>
      <Input
        placeholder="제목 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((content) => (
          <ContentCard
            key={content.contentId}
            content={content}
            onClick={() => setSelectedContent(content)}
            onDelete={() => deleteContent(content)}
          />
        ))}
      </div>

      {selectedContent && (
        <ContentDetailModal
        content={selectedContent}
        onClose={() => setSelectedContent(null)}
        onUpdate={(updatedFields: Record<string, string>) => {
          update(
            ref(
              db,
              `tour_data/contents/${selectedContent.contentTypeId}/${selectedContent.contentId}`
            ),
            updatedFields
          )
          setSelectedContent(null)
        }}
        onDelete={() => {
          deleteContent(selectedContent)
          setSelectedContent(null)
        }}
      />
      
      )}
    </div>
  )
}

export default Contents
