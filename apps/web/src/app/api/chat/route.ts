import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // ili "gpt-4o" ako ti treba jači
      messages,
    });

    return NextResponse.json({
      reply: response.choices[0].message?.content || "Nema odgovora.",
    });
  } catch (error) {
    return NextResponse.json({ error: "Greška u AI chatu." }, { status: 500 });
  }
}