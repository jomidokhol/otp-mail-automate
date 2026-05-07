"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [setupData, setSetupData] = useState({ gmail: "", appPassword: "", senderName: "" });
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (usr) => {
      setUser(usr);
      if (usr) {
        const docRef = doc(db, "users", usr.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().appPassword) {
          window.location.href = "/dashboard/test";
        } else {
          setIsSetupComplete(false);
        }
      }
    });
  },[]);

  const handleAuth = async (e, type) => {
    e.preventDefault();
    try {
      if (type === "login") await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSetup = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "users", user.uid), setupData, { merge: true });
    window.location.href = "/dashboard/test";
  };

  if (user && !isSetupComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={handleSetup} className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Complete Setup</h2>
          <p className="text-sm text-gray-400 mb-4">Enter your Google App Password to automate OTPs.</p>
          <input required placeholder="Your Gmail" className="w-full p-3 mb-3 bg-gray-700 rounded" onChange={e => setSetupData({...setupData, gmail: e.target.value})} />
          <input required type="password" placeholder="Google App Password (16 chars)" className="w-full p-3 mb-3 bg-gray-700 rounded" onChange={e => setSetupData({...setupData, appPassword: e.target.value})} />
          <input required placeholder="Sender Name (e.g. My App)" className="w-full p-3 mb-4 bg-gray-700 rounded" onChange={e => setSetupData({...setupData, senderName: e.target.value})} />
          <button className="w-full bg-blue-600 p-3 rounded font-bold hover:bg-blue-500 transition">Save Setup</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">OTP Automate Login</h2>
        <input required placeholder="Email" className="w-full p-3 mb-3 bg-gray-700 rounded" onChange={e => setEmail(e.target.value)} />
        <input required type="password" placeholder="Password" className="w-full p-3 mb-4 bg-gray-700 rounded" onChange={e => setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={(e) => handleAuth(e, "login")} className="w-1/2 bg-blue-600 p-3 rounded font-bold">Login</button>
          <button onClick={(e) => handleAuth(e, "register")} className="w-1/2 bg-gray-600 p-3 rounded font-bold">Register</button>
        </div>
      </form>
    </div>
  );
}
