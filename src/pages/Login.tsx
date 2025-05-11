import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { get, ref } from "firebase/database"
import { auth } from "../firebase/auth"
import { database } from "../firebase/database"

// 관리자 권한 확인 함수
const checkAdminPermission = async (uid: string): Promise<boolean> => {
  try {
    const userRef = ref(database, `users/${uid}`)
    const snapshot = await get(userRef)
    if (snapshot.exists()) {
      const data = snapshot.val()
      return data.permissions && data.permissions.includes("admin")
    }
    return false
  } catch (error) {
    console.error("🚨 권한 확인 실패:", error)
    return false
  }
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // Firebase Auth로 로그인 시도
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // 관리자 권한 확인
      const isAdmin = await checkAdminPermission(user.uid)
      if (isAdmin) {
        navigate("/") // 관리자 권한이 있으면 메인 페이지로 이동
      } else {
        setError("관리자 권한이 없습니다.")
        await auth.signOut() // 권한 없으면 로그아웃
      }
    } catch (err: any) {
      setError("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.")
      console.error("로그인 오류:", err)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">TripWiki 관리자 로그인</h2>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
        >
          로그인
        </button>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      </form>
    </div>
  )
}

export default Login
