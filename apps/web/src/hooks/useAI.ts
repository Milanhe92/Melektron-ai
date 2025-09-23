// apps/web/src/hooks/useAI.ts
import { useState } from "react";

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function askAI(input: string) {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setResult(data.output || "No response from AI");
    } catch (err) {
      console.error("AI request failed", err);
      setResult("Error calling AI");
    } finally {
      setLoading(false);
    }
  }

  return { askAI, loading, result };
}