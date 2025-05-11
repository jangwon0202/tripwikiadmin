// src/firebase/users.ts
import { database } from "./database";
import { ref, get } from "firebase/database";

export interface UserProfile {
  nickname: string;
  email: string;
  // 필요에 따라 더 필드 추가
}

/** 모든 사용자의 프로필 가져오기 (uid 리스트 → 프로필 배열) */
export const fetchAllUserProfiles = async (): Promise<{ uid: string; profile: UserProfile }[]> => {
  const snap = await get(ref(database, "users"));
  if (!snap.exists()) return [];
  const data = snap.val() as Record<string, any>;
  return Object.entries(data).map(([uid, profile]) => ({
    uid,
    profile: {
      nickname: profile.nickname,
      email: profile.email,
      // …
    },
  }));
};

/** 단일 uid 의 프로필 가져오기 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const snap = await get(ref(database, `users/${uid}`));
  return snap.exists() ? (snap.val() as UserProfile) : null;
};
