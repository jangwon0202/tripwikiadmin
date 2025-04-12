// src/pages/Profile.tsx
import { getAuth, signOut, updatePassword } from "firebase/auth"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Profile: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const auth = getAuth()

  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")

  const handlePasswordChange = async () => {
    if (!auth.currentUser) return
    try {
      await updatePassword(auth.currentUser, newPassword)
      setMessage("✅ 비밀번호가 성공적으로 변경되었습니다.")
      setNewPassword("")
    } catch (error: any) {
      console.error(error)
      setMessage(`❌ 비밀번호 변경 실패: ${error.message}`)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/login")
    } catch (error) {
      console.error("로그아웃 실패", error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">프로필</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          아이디 (이메일)
        </label>
        <p className="bg-gray-100 p-2 rounded">{user?.email}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          비밀번호 변경
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="새 비밀번호 입력"
        />
        <button
          onClick={handlePasswordChange}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          비밀번호 변경
        </button>
      </div>

      {message && <div className="mt-2 text-sm text-gray-600">{message}</div>}

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        로그아웃
      </button>
    </div>
  )
}

export default Profile
