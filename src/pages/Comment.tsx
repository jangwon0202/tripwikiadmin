// src/pages/Comment.tsx
import React, { useEffect, useState } from "react";
import { fetchAllComments, updateCommentStatus, Comment } from "../firebase/comments";

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadComments = async () => {
    setLoading(true);
    const data = await fetchAllComments();
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleToggleStatus = async (comment: Comment) => {
    const nextStatus =
      comment.status === "hidden" ? "visible" : "hidden";
    await updateCommentStatus(comment.id, nextStatus);
    loadComments();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-xl font-bold mb-4">댓글 관리</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : comments.length === 0 ? (
        <p>등록된 댓글이 없습니다.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">작성자</th>
              <th className="border p-2">내용</th>
              <th className="border p-2">작성일</th>
              <th className="border p-2">상태</th>
              <th className="border p-2">조치</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c.id}>
                <td className="border p-2">{c.uid}</td>
                <td className="border p-2">{c.content}</td>
                <td className="border p-2">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2">{c.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleToggleStatus(c)}
                    className="px-2 py-1 bg-pink-400 text-white rounded"
                  >
                    {c.status === "hidden" ? "복원" : "숨김"}
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

export default Comments;
