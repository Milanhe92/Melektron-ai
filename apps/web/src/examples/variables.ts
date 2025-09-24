import OpenAI from "openai";

const client = new OpenAI();

async function run() {
  // tvoje "promenljive"
  const customer_name = "Jane Doe";
  const product = "40oz juice box";

  // praviš prompt kao string sa interpolacijom
  const prompt = `Napiši email za korisnika ${customer_name} o proizvodu ${product}.`;

  const response = await client.responses.create({
    model: "gpt-5",
    input: prompt,
  });

  console.log(response.output_text);
}

run();