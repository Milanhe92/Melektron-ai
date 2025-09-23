// apps/web/src/pages/api/ai.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // uzima iz .env
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;

    const response = await client.responses.create({
      model: "gpt-5",
      input: input || "Say hello from Melektron 🚀",
    });

    res.status(200).json({
      output: response.output_text,
    });
  } catch (err: any) {
    console.error("AI API error:", err);
    res.status(500).json({ error: err.message });
  }
}