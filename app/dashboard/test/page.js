"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function TestPage() {
  const[targetEmail, setTargetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const[validMins, setValidMins] = useState("5");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (usr) => {
      if (usr) {
        const d = await getDoc(doc(db, "users", usr.uid));
        setUserData(d.data());
      }
    });
  },[]);

  const testSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      body: JSON.stringify({
        targetEmail, otp, validMins,
        appPassword: userData.appPassword,
        gmail: userData.gmail,
        senderName: userData.senderName
      })
    });
    const data = await res.json();
    alert(data.message || data.error);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 bg-gray-800 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">Test OTP Sender</h1>
      <form onSubmit={testSend}>
        <label className="block mb-2 text-sm text-gray-400">Demo Target Gmail</label>
        <input required type="email" className="w-full p-3 mb-4 bg-gray-700 rounded" onChange={e => setTargetEmail(e.target.value)} />
        
        <label className="block mb-2 text-sm text-gray-400">Demo OTP</label>
        <input required type="number" className="w-full p-3 mb-4 bg-gray-700 rounded" onChange={e => setOtp(e.target.value)} />
        
        <label className="block mb-2 text-sm text-gray-400">Validation Time (Mins)</label>
        <input required type="number" defaultValue="5" className="w-full p-3 mb-6 bg-gray-700 rounded" onChange={e => setValidMins(e.target.value)} />
        
        <button disabled={loading} className="w-full bg-blue-600 p-3 rounded font-bold hover:bg-blue-500 transition">
          {loading ? "Sending..." : "Send Test OTP"}
        </button>
      </form>
    </div>
  );
}
