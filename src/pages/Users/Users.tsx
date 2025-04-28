// src/pages/Users/Users.tsx
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"

const Users = () => {
  const navigate = useNavigate()

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">사용자 관리 메뉴</h2>
      <div className="space-y-4">
        <Button className="w-full" onClick={() => navigate("account")}>1. 계정 관리</Button>
        <Button className="w-full" onClick={() => navigate("posts")}>2. 게시글 관리</Button>
        <Button className="w-full" onClick={() => navigate("../reviews")}>3. 리뷰글 관리</Button>
        <Button className="w-full" disabled>4. 팔로잉 관리 (준비중)</Button>
        <Button className="w-full" disabled>5. 팔로워 관리 (준비중)</Button>
      </div>
    </div>
  )
}

export default Users
