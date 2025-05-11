// src/pages/Friends/FollowerRow.tsx
import React, { useEffect, useState } from "react";
import { getUserProfile, UserProfile } from "../../firebase/users";

interface Props {
  uid: string;         // 관리 대상 UID
  otherUid: string;    // 팔로워 혹은 팔로잉 대상 UID
  type: "followers" | "following";
  onRemove: () => void;
}

const FollowerRow: React.FC<Props> = ({ uid, otherUid, type, onRemove }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getUserProfile(otherUid).then(setProfile);
  }, [otherUid]);

  if (!profile) return <div>로딩...</div>;

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
      <span>
        {profile.nickname} ({profile.email})
      </span>
      <button onClick={onRemove}>
        {type === "followers" ? "강제 언팔로우" : "언팔로잉 해제"}
      </button>
    </div>
  );
};

export default FollowerRow;
