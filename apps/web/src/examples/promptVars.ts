import { openai } from "../lib/openaiClient";

async function personalizedMessage() {
  const response = await openai.responses.create({
    model: "gpt-5",
    prompt: {
      id: "pmpt_abc123",
      version: "2",
      variables: {
        customer_name: "Milan He",
        product: "Melektron AI Assistant",
      },
    },
  });

  console.log(response.output_text);
}

personalizedMessage();