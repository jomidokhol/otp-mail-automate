import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw7ZogQLybTbAGphLayjmIfeGx3xiyWU4",
  authDomain: "otp-mail-automate.firebaseapp.com",
  projectId: "otp-mail-automate",
  storageBucket: "otp-mail-automate.firebasestorage.app",
  messagingSenderId: "169862255424",
  appId: "1:169862255424:web:a87cf49ea2bd90f716e0a5",
  measurementId: "G-JKJZRZM12G"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
