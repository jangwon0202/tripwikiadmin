// src/App.tsx
import React from "react"
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { AuthProvider, useAuth } from "./hooks/useAuth"
import Analytics from "./pages/Analytics"
import Backend from "./pages/Backend"
import Contents from "./pages/Contents"
import Detail from "./pages/Detail"
import Events from "./pages/Events"
import Favorites from "./pages/Favorites"
import Login from "./pages/Login"
import Main from "./pages/Main"
import Notifications from "./pages/Notifications"
import Planner from "./pages/Planner"
import Profile from "./pages/Profile"
import Reviews from "./pages/Reviews"
import AccountManager from "./pages/Users/AccountManager"
import PostManager from "./pages/Users/PostManager"
import Users from "./pages/Users/Users"
import EditPost from "./pages/Users/EditPost"

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
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>}/>
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
              <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>}/>
              <Route path="/users/account" element={<AccountManager />} />
              <Route path="/users/posts" element={<PostManager />} />
              <Route path="/users/posts/edit/:postId" element={<EditPost />} />
              <Route path="/contents" element={<ProtectedRoute><Contents /></ProtectedRoute>}/>
              <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>}/>
              <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>}/>
              <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>}/>
              <Route path="/planner" element={<ProtectedRoute><Planner /></ProtectedRoute>}/>
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>}/>
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>}/>
              <Route path="/backend" element={<ProtectedRoute><Backend /></ProtectedRoute>}/>
              <Route path="/detail/:contentTypeId/:contentId" element={<ProtectedRoute><Detail /></ProtectedRoute>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
