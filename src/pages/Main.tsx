//src/pages/Main.tsx
import React from "react"

interface MenuItem {
  title: string
}

const menus: MenuItem[] = [
  { title: "유저관리" },
  { title: "백엔드 관리" },
  { title: "리뷰관리" },
  { title: "관광지 정보관리" },
  { title: "축제 정보관리" },
  { title: "즐겨찾기 관리" },
  { title: "등등" },
]

const Main: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">메인페이지</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">메뉴 →</h2>
        <div className="flex flex-wrap gap-4">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="w-32 h-32 bg-gray-100 rounded-lg shadow flex flex-col justify-center items-center"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full mb-2" />
              <p className="text-sm">{menu.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">통계 분석 →</h2>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="w-40 h-40 bg-gray-100 rounded-lg shadow flex items-center justify-center"
            >
              <div>
                <div className="w-10 h-10 bg-gray-300 rounded-full mx-auto mb-2" />
                <p className="text-sm text-center">{item}st</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main
