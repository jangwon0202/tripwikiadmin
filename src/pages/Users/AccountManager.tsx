// src/pages/Users/AccountManager.tsx
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { getDatabase, onValue, ref, remove, set } from "firebase/database"
import { useEffect, useState } from "react"
<<<<<<< HEAD:src/pages/Users/AccountManager.tsx
import { Button } from "../../components/ui/button"
import { httpsCallable } from "firebase/functions"
import { functions } from "../../firebase"
=======
import { Button } from "../components/ui/button"
import { httpsCallable } from "firebase/functions"
import { functions } from "../firebase" // Firebase 앱에서 functions 가져오기
>>>>>>> ae8e329899043d0cf7c2ea67904d2ec70affcb06:src/pages/Users.tsx

type UserType = {
  uid: string
  email: string
  name: string
  permissions: string
}

const AccountManager = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newName, setNewName] = useState("")
  const [newPermission, setNewPermission] = useState("user")

  const db = getDatabase()
  const auth = getAuth()

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

  const updateName = (uid: string, newName: string) => {
    set(ref(db, `users/${uid}/name`), newName)
  }

  const updatePermissions = (uid: string, newPermissions: string) => {
    set(ref(db, `users/${uid}/permissions`), newPermissions)
  }

<<<<<<< HEAD:src/pages/Users/AccountManager.tsx
  const deleteUserAccount = async (uid: string) => {
    const dbRef = ref(db, `users/${uid}`)
    await remove(dbRef)
    const deleteAuthUser = httpsCallable(functions, "deleteAuthUser")
    try {
      await deleteAuthUser({ uid })
=======
  // 사용자 계정 삭제
  const deleteUserAccount = async (uid: string) => {
    const dbRef = ref(db, `users/${uid}`)
    await remove(dbRef)
  
    const deleteAuthUser = httpsCallable(functions, "deleteAuthUser")
    try {
      await deleteAuthUser({ uid })
      console.log("Auth 사용자도 삭제됨")
>>>>>>> ae8e329899043d0cf7c2ea67904d2ec70affcb06:src/pages/Users.tsx
    } catch (error) {
      console.error("Auth 삭제 실패:", error)
    }
  }

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">계정 관리</h2>

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
            setNewEmail("")
            setNewPassword("")
            setNewName("")
            setNewPermission("user")
          }}
        >
          사용자 추가
        </Button>
      </div>
    </div>
  )
}

export default AccountManager
