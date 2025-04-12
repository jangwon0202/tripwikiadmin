import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { doc, DocumentData, getDoc, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"

// 타입 정의
interface UserWithPermissions extends User {
  permissions: string[] // 권한을 배열로 정의
}

export const useAuth = () => {
  const [user, setUser] = useState<UserWithPermissions | null>(null) // user의 타입을 UserWithPermissions로 정의
  const [permissions, setPermissions] = useState<string[]>([]) // permissions 배열의 타입을 string[]로 정의

  useEffect(() => {
    const auth = getAuth()
    const db = getFirestore()

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const userData = docSnap.data() as DocumentData // 문서 데이터를 가져와 타입을 지정
          setUser({
            ...currentUser,
            ...userData,
            permissions: userData.permissions || [],
          }) // user 객체에 permissions 추가
          setPermissions(userData.permissions || [])
        }
      } else {
        setUser(null)
        setPermissions([])
      }
    })

    return () => unsubscribe()
  }, [])

  // hasPermission 함수에 타입 정의
  const hasPermission = (perm: string): boolean => permissions.includes(perm)

  return { user, permissions, hasPermission }
}
