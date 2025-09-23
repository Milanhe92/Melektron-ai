import { openai } from "../lib/openaiClient";

async function pirateAnswer() {
  const response = await openai.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    instructions: "Talk like a pirate.",
    input: "Are semicolons optional in JavaScript?",
  });

  console.log(response.output_text);
}

pirateAnswer();