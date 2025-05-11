// src/firebase/auth.ts
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth"
import { app } from "./config"

// Firebase Auth 인스턴스
const auth = getAuth(app)

/**
 * 이메일/비밀번호 로그인
 */
export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

/**
 * 로그아웃
 */
export const logout = () => signOut(auth)

/**
 * 현재 로그인한 유저
 */
export const getCurrentUser = (): User | null => auth.currentUser

export { auth }
