// src/components/Sidebar.tsx
import React from "react"
import * as FaIcons from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const FaUserCogIcon = FaIcons.FaUserCog as React.FC<{ size?: number }>
const FaPlusIcon = FaIcons.FaPlus as React.FC<{ size?: number }>
const FaToolsIcon = FaIcons.FaTools as React.FC<{ size?: number }>
const FaCommentsIcon = FaIcons.FaComments as React.FC<{ size?: number }>
const FaMapMarkerAltIcon = FaIcons.FaMapMarkerAlt as React.FC<{ size?: number }>
const FaStarIcon = FaIcons.FaStar as React.FC<{ size?: number }>
const FaHomeIcon = FaIcons.FaHome as React.FC<{ size?: number }>

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleUserClick = () => {
    if (user) {
      navigate("/profile")
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="w-20 bg-pink-100 h-screen flex flex-col items-center py-4 space-y-6">
      {/* 메인 페이지 이동 버튼 */}
      <Link to="/" className="flex flex-col items-center hover:text-pink-700">
        <FaHomeIcon size={24} />
        <p className="text-xs mt-1">메인</p>
      </Link>

      {/* 계정 버튼 */}
      <div className="flex flex-col items-center">
        <button
          onClick={handleUserClick}
          className="flex flex-col items-center text-center"
        >
          <FaUserCogIcon size={24} />
          <p className="text-xs mt-1">{user ? "프로필" : "계정"}</p>
        </button>
      </div>

      {/* 추가 버튼 */}
      <div className="flex flex-col items-center">
        <button className="p-2 bg-pink-300 rounded-full hover:bg-pink-400">
          <FaPlusIcon size={20} />
        </button>
      </div>

      {/* 유저 링크 */}
      <div className="flex flex-col items-center">
        <Link
          to="/users"
          className="flex flex-col items-center hover:text-pink-700"
        >
          <FaUserCogIcon size={24} />
          <p className="text-xs mt-1">유저</p>
        </Link>
      </div>

      {/* 나머지 메뉴 */}
      <Link to="/backend" className="flex flex-col items-center text-center">
        <FaToolsIcon size={24} />
        <p className="text-xs mt-1">백엔드</p>
      </Link>
      <Link to="/reviews" className="flex flex-col items-center text-center">
        <FaCommentsIcon size={24} />
        <p className="text-xs mt-1">리뷰</p>
      </Link>
      <Link to="/contents" className="flex flex-col items-center text-center">
        <FaMapMarkerAltIcon size={24} />
        <p className="text-xs mt-1">관광지</p>
      </Link>
      <Link to="/favorites" className="flex flex-col items-center text-center">
        <FaStarIcon size={24} />
        <p className="text-xs mt-1">즐겨찾기</p>
      </Link>
    </div>
  )
}

export default Sidebar
