// apps/web/src/components/AIChat.tsx
"use client";

import { useState } from "react";
import { useAI } from "../hooks/useAI";

export default function AIChat() {
  const { askAI, loading, result } = useAI();
  const [input, setInput] = useState("");

  return (
    <div className="p-6 border rounded-2xl shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">🤖 Melektron AI</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Unesi pitanje..."
        className="w-full p-2 border rounded-lg mb-4"
      />

      <button
        onClick={() => askAI(input)}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <strong>Odgovor:</strong> {result}
        </div>
      )}
    </div>
  );
}