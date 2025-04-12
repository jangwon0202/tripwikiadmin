// src/App.tsx
import React from "react" // 이 줄을 추가하세요.
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Analytics from "./pages/Analytics"
import Backend from "./pages/Backend"
import Contents from "./pages/Contents"
import Events from "./pages/Events"
import Favorites from "./pages/Favorites"
import Main from "./pages/Main"
import Notifications from "./pages/Notifications"
import Planner from "./pages/Planner"
import Reviews from "./pages/Reviews"
import Users from "./pages/Users"

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users" element={<Users />} />
            <Route path="/contents" element={<Contents />} />
            <Route path="/events" element={<Events />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/backend" element={<Backend />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
