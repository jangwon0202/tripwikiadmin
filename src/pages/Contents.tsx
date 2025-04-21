// src/pages/Contents.tsx
<<<<<<< HEAD
import { getDatabase, onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
=======
import { useEffect, useState } from "react"
import { getDatabase, ref, onValue, remove, set, update } from "firebase/database"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import ContentCard from "../components/ContentCard"
import ContentDetailModal from "../components/ContentDetailModal"
>>>>>>> ae8e329899043d0cf7c2ea67904d2ec70affcb06

type ContentType = {
  contentId: string
  contentTypeId: string
  title: string
  firstimage?: string
  [key: string]: any
}

const Contents = () => {
  const [contents, setContents] = useState<ContentType[]>([])
<<<<<<< HEAD
  const [searchTerm, setSearchTerm] = useState("")
  const [searched, setSearched] = useState(false)
  const db = getDatabase()
  const navigate = useNavigate()
=======
  const [selectedContent, setSelectedContent] = useState<ContentType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const db = getDatabase()
>>>>>>> ae8e329899043d0cf7c2ea67904d2ec70affcb06

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

<<<<<<< HEAD
  const filtered = contents.filter((c) =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = () => setSearched(true)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch()
=======
  const filtered = contents.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteContent = (content: ContentType) => {
    remove(ref(db, `tour_data/contents/${content.contentTypeId}/${content.contentId}`))
>>>>>>> ae8e329899043d0cf7c2ea67904d2ec70affcb06
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">관광지 관리</h2>
<<<<<<< HEAD
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="제목 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSearch}>검색</Button>
      </div>

      {!searched ? (
        <p className="text-gray-500">검색어를 입력해주세요.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((content) => (
            <div
              key={content.contentId}
              onClick={() =>
                navigate(
                  `/detail/${content.contentTypeId}/${content.contentId}`
                )
              }
              className="cursor-pointer border p-2 rounded hover:shadow"
            >
              <img
                src={content.firstimage || "/no-image.png"}
                alt={content.title}
                className="w-[100px] h-[100px] object-cover mx-auto"
              />
              <p className="mt-2 text-center text-sm">{content.title}</p>
            </div>
          ))}
        </div>
=======
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
      
>>>>>>> ae8e329899043d0cf7c2ea67904d2ec70affcb06
      )}
    </div>
  )
}

export default Contents
