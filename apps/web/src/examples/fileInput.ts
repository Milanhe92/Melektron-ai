// apps/web/src/examples/fileInput.ts
import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const file = await client.files.create({
    file: fs.createReadStream("draconomicon.pdf"),
    purpose: "user_data",
  });

  const response = await client.responses.create({
    model: "gpt-5",
    input: [
      {
        role: "user",
        content: "Give me a summary about Dragons using this PDF.",
      },
    ],
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