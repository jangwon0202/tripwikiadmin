// src/pages/Users.tsx
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { getDatabase, onValue, ref, remove, set } from "firebase/database"
import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"

type UserType = {
  uid: string
  email: string
  name: string
  permissions: string
}

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newName, setNewName] = useState("")
  const [newPermission, setNewPermission] = useState("user")

  const db = getDatabase()
  const auth = getAuth()

  // 사용자 목록을 불러오는 useEffect
  useEffect(() => {
    const usersRef = ref(db, "users")
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      const loadedUsers: UserType[] = data
        ? Object.entries(data).map(([uid, user]: any) => ({
            uid,
            email: user.email,
            name: user.name,
            permissions: user.permissions,
          }))
        : []
      setUsers(loadedUsers)
    })
  }, [db])

  // 이름 업데이트
  const updateName = (uid: string, newName: string) => {
    set(ref(db, `users/${uid}/name`), newName)
  }

  // 권한 업데이트
  const updatePermissions = (uid: string, newPermissions: string) => {
    set(ref(db, `users/${uid}/permissions`), newPermissions)
  }

  // 사용자 계정 삭제
  const deleteUserAccount = (uid: string) => {
    remove(ref(db, `users/${uid}`))
    // 🔒 Firebase Auth에서는 서버 측에서 deleteUser를 사용해야 함 (client에서 제한)
  }

  // 새로운 사용자 생성
  const createNewUser = async (
    email: string,
    password: string,
    name: string,
    permissions: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const newUser = userCredential.user

      // Firebase Realtime Database에 새 사용자 정보 저장
      await set(ref(db, `users/${newUser.uid}`), {
        email,
        name,
        permissions,
      })
    } catch (error) {
      console.error("사용자 생성 오류:", error)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">사용자 관리</h2>
      {users.map((user) => (
        <div key={user.uid} className="mb-4 p-2 border rounded">
          <p>이메일: {user.email}</p>
          <input
            type="text"
            defaultValue={user.name}
            onBlur={(e) => updateName(user.uid, e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <select
            value={user.permissions}
            onChange={(e) => updatePermissions(user.uid, e.target.value)}
            className="ml-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <Button
            onClick={() => deleteUserAccount(user.uid)}
            className="ml-4 bg-red-500 text-white"
          >
            삭제
          </Button>
        </div>
      ))}

      {/* 새 사용자 추가 섹션 */}
      <div className="mb-8 border p-4 rounded bg-gray-50">
        <h3 className="font-semibold mb-2">새 사용자 추가</h3>
        <input
          type="email"
          placeholder="이메일"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border px-2 py-1 mr-2 rounded"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border px-2 py-1 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="닉네임"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border px-2 py-1 mr-2 rounded"
        />
        <select
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          className="border rounded px-2 py-1 mr-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <Button
          className="bg-blue-500 text-white"
          onClick={() => {
            createNewUser(newEmail, newPassword, newName, newPermission)
            setNewEmail("") // 입력 필드 초기화
            setNewPassword("") // 입력 필드 초기화
            setNewName("") // 입력 필드 초기화
            setNewPermission("user") // 권한 기본값으로 초기화
          }}
        >
          사용자 추가
        </Button>
      </div>
    </div>
  )
}

export default Users
