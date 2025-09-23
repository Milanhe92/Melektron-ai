import OpenAI from "openai";

const client = new OpenAI();

async function run() {
  const customer_name = "Jane Doe";
  const product = "Kutija soka od 1200 ml";

  // Promenljive se interpoliraju u string
  const prompt = `Napiši email za korisnika ${customer_name} o proizvodu ${product}.`;

  const response = await client.responses.create({
    model: "gpt-5",
    input: prompt,
  });

  console.log(response.output_text);
}

run();