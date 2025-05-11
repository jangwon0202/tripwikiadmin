// src/firebase/functions.ts
import { getFunctions, httpsCallable } from "firebase/functions"
import { app } from "./config"

/**
 * Cloud Functions 인스턴스
 */
const functions = getFunctions(app)

/**
 * callable 함수 래퍼 예시
 * @param name 함수명 (Firebase에 배포된 https callable 함수)
 */
export const callFunction = <T, R>(name: string) =>
  httpsCallable<T, R>(functions, name)

// 예시로, 사용자 정리(cleanUpUsers) 함수 호출
export const cleanUpUsers = () =>
  callFunction<{}, { result: string }>("cleanUpUsers")()

// 예시로, Auth 사용자 삭제(deleteAuthUser) 함수 호출
export const deleteAuthUser = (uid: string) =>
  callFunction<{ uid: string }, { success: boolean }>("deleteAuthUser")({ uid })

export { functions }
