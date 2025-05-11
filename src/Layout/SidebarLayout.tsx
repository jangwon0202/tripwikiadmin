// src/Layout/SidebarLayout.tsx
import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const SidebarLayout: React.FC = () => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <main style={{ flex: 1, padding: 20 }}>
      <Outlet />
    </main>
  </div>
)

export default SidebarLayout
