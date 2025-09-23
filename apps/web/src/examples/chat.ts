import OpenAI from "openai";

const client = new OpenAI();

async function run() {
  const response = await client.responses.create({
    model: "gpt-5",
    input: [
      { role: "system", content: "Ti si koristan asistent." },
      { role: "user", content: "Objasni mi kvantno računarstvo jednostavno." },
    ],
  });

  console.log(response.output_text);
}

run();