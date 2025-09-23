import OpenAI from "openai";

const client = new OpenAI();

async function run() {
  const response = await client.responses.create({
    model: "gpt-5",
    input: "Napiši kratak pozdrav na srpskom jeziku.",
  });

  console.log(response.output_text);
}

run();