// src/firebase/database.ts
import { getDatabase } from "firebase/database"
import { app } from "./config"

// Realtime Database 인스턴스
const database = getDatabase(app)

export { database }
