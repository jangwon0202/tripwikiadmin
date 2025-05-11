// src/firebase/friends.ts
import { database } from "./database";
import { ref, get, set, remove } from "firebase/database";

/** 특정 유저의 팔로워(uid 리스트) 가져오기 */
export const fetchFollowers = async (uid: string): Promise<string[]> => {
  const snap = await get(ref(database, `friends/${uid}/followers`));
  return snap.exists() ? Object.keys(snap.val()) : [];
};

/** 특정 유저의 팔로잉(uid 리스트) 가져오기 */
export const fetchFollowing = async (uid: string): Promise<string[]> => {
  const snap = await get(ref(database, `friends/${uid}/following`));
  return snap.exists() ? Object.keys(snap.val()) : [];
};

/** uid 의 followers 에 followerUid 추가 */
export const addFollower = (uid: string, followerUid: string) =>
  set(ref(database, `friends/${uid}/followers/${followerUid}`), true);

/** uid 의 followers 에서 followerUid 제거 */
export const removeFollower = (uid: string, followerUid: string) =>
  remove(ref(database, `friends/${uid}/followers/${followerUid}`));

/** uid 의 following 에 followingUid 추가 */
export const addFollowing = (uid: string, followingUid: string) =>
  set(ref(database, `friends/${uid}/following/${followingUid}`), true);

/** uid 의 following 에서 followingUid 제거 */
export const removeFollowing = (uid: string, followingUid: string) =>
  remove(ref(database, `friends/${uid}/following/${followingUid}`));
