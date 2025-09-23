import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  // Upload PDF fajla
  const file = await client.files.create({
    file: fs.createReadStream("draconomicon.pdf"),
    purpose: "user_data",
  });

  // Ispravan poziv – koristimo input, ne prompt
  const response = await client.responses.create({
    model: "gpt-5",
    input: [
      {
        role: "user",
        content: `Give me a summary about Dragons using this PDF.`,
      },
    ],
    // Varijable iz file-a se ubacuju ovako:
    attachments: [
      {
        type: "input_file",
        file_id: file.id,
      },
    ],
  });

  console.log(response.output_text);
}

run();