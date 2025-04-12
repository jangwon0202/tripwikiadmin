// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Main from "./pages/Main"
import Users from "./pages/Users"
import Contents from "./pages/Contents"
import Events from "./pages/Events"
import Reviews from "./pages/Reviews"
import Favorites from "./pages/Favorites"
import Planner from "./pages/Planner"
import Notifications from "./pages/Notifications"
import Analytics from "./pages/Analytics"
import Backend from "./pages/Backend"

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
