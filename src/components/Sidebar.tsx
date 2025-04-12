import { default as React, default as React } from "react"
import {
  FaComments,
  FaMapMarkerAlt,
  FaPlus,
  FaStar,
  FaTools,
  FaUserCog,
} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"; // 커스텀 훅
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
      <FaUserCog size={24} />
      <p className="text-xs">계정</p>
    </button>
      <button className="mb-6 p-2 bg-pink-300 rounded-full hover:bg-pink-400">
        <FaPlus size={20} />
      </button>
      <Link to="/users" className="mb-6 text-center hover:text-pink-700">
        <FaUserCog size={24} />
        <p className="text-xs mt-1">유저</p>
      </Link>
      <Link to="/backend" className="mb-6 text-center">
        <FaTools size={24} />
        <p className="text-xs mt-1">백엔드</p>
      </Link>
      <Link to="/reviews" className="mb-6 text-center">
        <FaComments size={24} />
        <p className="text-xs mt-1">리뷰</p>
      </Link>
      <Link to="/contents" className="mb-6 text-center">
        <FaMapMarkerAlt size={24} />
        <p className="text-xs mt-1">관광지</p>
      </Link>
      <Link to="/favorites" className="mb-6 text-center">
        <FaStar size={24} />
        <p className="text-xs mt-1">즐겨찾기</p>
      </Link>
    </div>
  );
};

export default Sidebar;
