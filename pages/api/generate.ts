export default async function handle(req, res) {
  const prompt = generatePrompt(req.body);

  let result;
  await query({
    inputs: prompt,
    parameters: {
      max_new_tokens: 200,
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
    },
  }).then((response) => {
    result = response[0].generated_text;
  });

  // Remove prompt from result by removing text with the length of the prompt
  result = result.slice(prompt.length);

  res.status(200).json({ result: result });
}

function generatePrompt(params) {
  const article = params.level[0] in ["a", "e", "i", "o", "u"] ? "an" : "a";
  const methods = params.methods.join(", ");
  return `Generate a learning curriculum for learning ${params.topic} at ${article} ${params.level} level. The learning curriculum should be based on ${methods}. Provide step by step concepts to learn and resources for each step.`;
}

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();

  return result;
}
