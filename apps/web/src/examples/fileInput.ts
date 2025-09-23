import OpenAI from "openai";

const client = new OpenAI();

async function run() {
  // Jednostavan input fajl kao tekst
  const fileContent = "Ovo je sadržaj fajla koji testiramo.";

  const response = await client.responses.create({
    model: "gpt-5",
    input: `Analiziraj sledeći tekst:\n\n${fileContent}`,
  });

  console.log(response.output_text);
}

run();