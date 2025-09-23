// apps/web/src/examples/promptVars.ts
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const response = await client.responses.create({
    model: "gpt-5",
    input: [
      {
        role: "user",
        content: `Write an ad for a product using the provided variables.`,
      },
    ],
    metadata: {
      prompt_id: "pmpt_abc123",
      version: "2",
      variables: {
        customer_name: "Jane Doe",
        product: "40oz juice box",
      },
    },
  });

  console.log(response.output_text);
}

run();