import fs from "fs";
import { openai } from "../lib/openaiClient";

async function analyzePDF() {
  // Upload PDF
  const file = await openai.files.create({
    file: fs.createReadStream("docs/whitepaper.pdf"),
    purpose: "user_data",
  });

  // Use PDF u odgovoru
  const response = await openai.responses.create({
    model: "gpt-5",
    prompt: {
      id: "pmpt_abc123",
      variables: {
        topic: "Melektron Quantum Engine",
        reference_pdf: {
          type: "input_file",
          file_id: file.id,
        },
      },
    },
  });

  console.log(response.output_text);
}

analyzePDF();