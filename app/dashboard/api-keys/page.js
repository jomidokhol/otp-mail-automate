"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function ApiKeys() {
  const[apiName, setApiName] = useState("");
  const [createdKey, setCreatedKey] = useState("");

  const generateKey = async () => {
    if(!apiName) return alert("Enter API Name");
    const newKey = "sk_" + uuidv4().replace(/-/g, "");
    
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      apiKeys: arrayUnion({ name: apiName, key: newKey, createdAt: new Date() })
    });
    setCreatedKey(newKey);
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 bg-gray-800 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-green-400">Generate API Key</h1>
      <input placeholder="App/Website Name" className="w-full p-3 mb-4 bg-gray-700 rounded" onChange={e => setApiName(e.target.value)} />
      <button onClick={generateKey} className="w-full bg-green-600 p-3 rounded font-bold hover:bg-green-500 mb-4">Create API</button>
      
      {createdKey && (
        <div className="p-4 bg-gray-900 border border-green-500 rounded text-sm break-all">
          <p className="text-gray-400 mb-1">Your New API Key (Copy Now):</p>
          <span className="text-green-400 font-mono">{createdKey}</span>
        </div>
      )}
    </div>
  );
}
