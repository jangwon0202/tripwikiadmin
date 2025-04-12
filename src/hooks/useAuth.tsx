import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const auth = getAuth()
    const db = getFirestore()

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUser({ ...currentUser, ...docSnap.data() })
          setPermissions(docSnap.data().permissions || [])
        }
      } else {
        setUser(null)
        setPermissions([])
      }
    })

    return () => unsubscribe()
  }, [])

  const hasPermission = (perm) => permissions.includes(perm)

  return { user, permissions, hasPermission }
}
