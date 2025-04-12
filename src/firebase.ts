// src/firebase.ts
import { Analytics, getAnalytics } from "firebase/analytics"
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app"
import { Auth, getAuth } from "firebase/auth"
import { Database, getDatabase } from "firebase/database"
import { FirebaseStorage, getStorage } from "firebase/storage"
import { getFirestore, Firestore } from "firebase/firestore"

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDFBgIhT_z7bpG_PT1hnNEjqkba_fCn3o8",
  authDomain: "tripwiki-bce63.firebaseapp.com",
  databaseURL: "https://tripwiki-bce63-default-rtdb.firebaseio.com",
  projectId: "tripwiki-bce63",
  storageBucket: "tripwiki-bce63.appspot.com", // ← 여기도 `.app`에서 `.appspot.com`으로 수정
  messagingSenderId: "364803778016",
  appId: "1:364803778016:web:3698696d7aa17d5995b785",
  measurementId: "G-HFHNLF68NH",
}

// Firebase 초기화
const app: FirebaseApp = initializeApp(firebaseConfig)

const analytics: Analytics = getAnalytics(app)
const auth: Auth = getAuth(app)
const database: Database = getDatabase(app)
const storage: FirebaseStorage = getStorage(app)
const firestore: Firestore = getFirestore(app)

export { analytics, app, auth, database, storage, firestore }
