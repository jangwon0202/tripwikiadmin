// src/pages/Reviews.tsx
import React, { useEffect, useState } from "react";
import { fetchAllReviews, updateReviewStatus, Review } from "../firebase/reviews";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    setLoading(true);
    const data = await fetchAllReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleStatus = async (review: Review) => {
    const nextStatus =
      review.status === "hidden" ? "visible" : "hidden";
    await updateReviewStatus(review.id, nextStatus);
    loadReviews(); // 새로고침
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-xl font-bold mb-4">리뷰 관리</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : reviews.length === 0 ? (
        <p>등록된 리뷰가 없습니다.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">작성자</th>
              <th className="border p-2">내용</th>
              <th className="border p-2">평점</th>
              <th className="border p-2">작성일</th>
              <th className="border p-2">상태</th>
              <th className="border p-2">조치</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id}>
                <td className="border p-2">{r.uid}</td>
                <td className="border p-2">{r.content}</td>
                <td className="border p-2">{r.rating}</td>
                <td className="border p-2">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2">{r.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleToggleStatus(r)}
                    className="px-2 py-1 bg-pink-400 text-white rounded"
                  >
                    {r.status === "hidden" ? "복원" : "숨김"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reviews;
