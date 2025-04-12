// hooks/useAuth.ts
import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"

interface AuthContextType {
  user: User | null
}

const AuthContext = createContext<AuthContextType>({ user: null })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
