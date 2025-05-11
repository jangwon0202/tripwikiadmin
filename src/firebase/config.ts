// src/firebase/config.ts
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app"

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDFBgIhT_z7bpG_PT1hnNEjqkba_fCn3o8",
  authDomain: "tripwiki-bce63.firebaseapp.com",
  databaseURL: "https://tripwiki-bce63-default-rtdb.firebaseio.com",
  projectId: "tripwiki-bce63",
  storageBucket: "tripwiki-bce63.appspot.com",
  messagingSenderId: "364803778016",
  appId: "1:364803778016:web:3698696d7aa17d5995b785",
  measurementId: "G-HFHNLF68NH",
}

const app: FirebaseApp = initializeApp(firebaseConfig)

export { app }
export default firebaseConfig
