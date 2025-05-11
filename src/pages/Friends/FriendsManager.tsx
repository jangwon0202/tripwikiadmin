// src/pages/Friends/FriendsManager.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchFollowers,
  fetchFollowing,
  removeFollower,
  removeFollowing,
} from "../../firebase/friends";
import FollowerRow from "./FollowerRow";

const FriendsManager: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const [tab, setTab] = useState<"followers" | "following">("followers");
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!uid) return;
      setLoading(true);
      const data =
        tab === "followers"
          ? await fetchFollowers(uid)
          : await fetchFollowing(uid);
      setList(data);
      setLoading(false);
    };
    load();
  }, [uid, tab]);

  if (!uid) return <div>관리할 사용자를 선택해주세요.</div>;

  return (
    <div>
      <h1>Friends Manager (UID: {uid})</h1>
      <div>
        <button onClick={() => setTab("followers")}>Followers</button>
        <button onClick={() => setTab("following")}>Following</button>
      </div>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        list.map((otherUid) => (
          <FollowerRow
            key={otherUid}
            uid={uid}
            otherUid={otherUid}
            type={tab}
            onRemove={() => {
              if (tab === "followers")
                removeFollower(uid, otherUid).then(() => {
                  /* ...reload... */
                });
              else
                removeFollowing(uid, otherUid).then(() => {
                  /* ...reload... */
                });
            }}
          />
        ))
      )}
    </div>
  );
};

export default FriendsManager;
