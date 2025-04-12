// src/index.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import reportWebVitals from "./reportWebVitals"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("root element not found")
}

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

reportWebVitals()
