"use client";

import { useState } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    if (data.reply) {
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-3">🤖 Melektron AI Chat</h2>
      <div className="space-y-2 mb-3 max-h-64 overflow-y-auto border p-2 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? "text-blue-400" : "text-green-400"}>
            <b>{msg.role}:</b> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 border border-gray-600"
          placeholder="Unesi poruku..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Pošalji
        </button>
      </div>
    </div>
  );
}