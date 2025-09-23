// apps/web/src/examples/oneSentenceStory.ts
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const response = await client.responses.create({
    model: "gpt-5",
    input: "Write a one-sentence bedtime story about a unicorn.",
  });

  console.log(response.output_text);
}

run();