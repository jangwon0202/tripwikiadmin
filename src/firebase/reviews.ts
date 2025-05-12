// src/firebase/reviews.ts
import { get, ref, set } from "firebase/database";
import { database } from "./database";

export interface Review {
  id: string;
  uid: string;
  content: string;
  rating: number;
  targetId: string;
  createdAt: number;
  status: "visible" | "hidden" | "reported";
}

export const fetchAllReviews = async (): Promise<Review[]> => {
  const snap = await get(ref(database, "reviews"));
  const raw = snap.val();
  if (!raw) return [];

  return Object.entries(raw).map(([id, value]: [string, any]) => ({
    id,
    uid: value.uid,
    content: value.content,
    rating: value.rating,
    targetId: value.targetId,
    createdAt: value.createdAt,
    status: value.status || "visible",
  }));
};

export const updateReviewStatus = (id: string, status: Review["status"]) =>
  set(ref(database, `reviews/${id}/status`), status);
