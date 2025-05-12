// src/App.tsx
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import SidebarLayout from "./Layout/SidebarLayout";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Analytics from "./pages/Analytics";
import Backend from "./pages/Backend";
import Contents from "./pages/Contents";
import Comment from "./pages/Comment";
import Detail from "./pages/Detail";
import Events from "./pages/Events";
import Favorites from "./pages/Users/Favorites";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Notifications from "./pages/Notifications";
import Planner from "./pages/Planner";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import AccountManager from "./pages/Users/AccountManager";
import EditPost from "./pages/Users/EditPost";
import PostManager from "./pages/Users/PostManager";
import Users from "./pages/Users/Users";
import FriendsManager from "./pages/Friends/FriendsManager";

// ✅ 로그인 여부에 따라 접근 보호
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 로그인 페이지만 인증 없이 */}
          <Route path="/login" element={<Login />} />

          {/* 인증된 사용자만 접근 가능한 레이아웃 및 하위 페이지 */}
          <Route
            element={
              <ProtectedRoute>
                <SidebarLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Main />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<Users />} />
            <Route path="users/account" element={<AccountManager />} />
            <Route path="users/posts" element={<PostManager />} />
            <Route path="users/posts/edit/:postId" element={<EditPost />} />
            <Route path="contents" element={<Contents />} />
            <Route path="comment" element={<Comment />} />
            <Route path="events" element={<Events />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="users/favorites" element={<Favorites />} />
            <Route path="planner" element={<Planner />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="backend" element={<Backend />} />
            <Route path="detail/:contentTypeId/:contentId" element={<Detail />} />
            <Route path="friends/:uid" element={<FriendsManager />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App
