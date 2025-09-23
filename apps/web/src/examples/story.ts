import { openai } from "../lib/openaiClient";

async function bedtimeStory() {
  const response = await openai.responses.create({
    model: "gpt-5",
    input: "Write a short bedtime story about a unicorn.",
  });

  console.log(response.output_text);
}

bedtimeStory();