// src/firebase/comments.ts
import { get, ref, set } from "firebase/database";
import { database } from "./database";

export interface Comment {
  id: string;
  uid: string;
  content: string;
  postId: string;
  createdAt: number;
  status: "visible" | "hidden" | "reported";
}

export const fetchAllComments = async (): Promise<Comment[]> => {
  const snap = await get(ref(database, "comments"));
  const raw = snap.val();
  if (!raw) return [];

  return Object.entries(raw).map(([id, value]: [string, any]) => ({
    id,
    uid: value.uid,
    content: value.content,
    postId: value.postId,
    createdAt: value.createdAt,
    status: value.status || "visible",
  }));
};

export const updateCommentStatus = (id: string, status: Comment["status"]) =>
  set(ref(database, `comments/${id}/status`), status);
