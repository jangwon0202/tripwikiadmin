import React from "react"
import * as FaIcons from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth" // 커스텀 훅

const FaUserCogIcon = FaIcons.FaUserCog as React.FC<{ size?: number }>
const FaPlusIcon = FaIcons.FaPlus as React.FC<{ size?: number }>
const FaToolsIcon = FaIcons.FaTools as React.FC<{ size?: number }>
const FaCommentsIcon = FaIcons.FaComments as React.FC<{ size?: number }>
const FaMapMarkerAltIcon = FaIcons.FaMapMarkerAlt as React.FC<{ size?: number }>
const FaStarIcon = FaIcons.FaStar as React.FC<{ size?: number }>
// 타입 정의 추가
type SidebarProps = {
  user?: { [key: string]: any } // user의 타입을 정의 (필요에 따라 구체화)
}

const Sidebar: React.FC<SidebarProps> = () => {
  const navigate = useNavigate()
  const { user } = useAuth() // useAuth 훅을 통해 user 정보 가져오기

  const handleUserClick = () => {
    if (user) {
      navigate("/profile")
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="w-20 bg-pink-100 h-screen flex flex-col items-center py-4">
      <button onClick={handleUserClick} className="mb-6">
        <FaUserCogIcon size={24} />
        <p className="text-xs">계정</p>
      </button>
      <button className="mb-6 p-2 bg-pink-300 rounded-full hover:bg-pink-400">
        <FaPlusIcon size={20} />
      </button>
      <Link to="/users" className="mb-6 text-center hover:text-pink-700">
        <FaUserCogIcon size={24} />
        <p className="text-xs mt-1">유저</p>
      </Link>
      <Link to="/backend" className="mb-6 text-center">
        <FaToolsIcon size={24} />
        <p className="text-xs mt-1">백엔드</p>
      </Link>
      <Link to="/reviews" className="mb-6 text-center">
        <FaCommentsIcon size={24} />
        <p className="text-xs mt-1">리뷰</p>
      </Link>
      <Link to="/contents" className="mb-6 text-center">
        <FaMapMarkerAltIcon size={24} />
        <p className="text-xs mt-1">관광지</p>
      </Link>
      <Link to="/favorites" className="mb-6 text-center">
        <FaStarIcon size={24} />
        <p className="text-xs mt-1">즐겨찾기</p>
      </Link>
    </div>
  )
}

export default Sidebar
