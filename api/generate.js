export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { idea } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!idea || idea.trim().length < 10) {
    return res.status(400).json({ error: "Invalid idea input." });
  }

  const prompt = `You are a branding expert. 
Based on the following startup idea: "${idea}",

Generate 3 brand identity options. Each option should include:
- A unique brand name
- A catchy and creative tagline
- A short, available domain name

Return ONLY valid JSON in this format (no explanation):

[
  {
    "name": "Brand Name 1",
    "tagline": "Creative Tagline 1",
    "domain": "brand1.com"
  },
  {
    "name": "Brand Name 2",
    "tagline": "Creative Tagline 2",
    "domain": "brand2.com"
  },
  {
    "name": "Brand Name 3",
    "tagline": "Creative Tagline 3",
    "domain": "brand3.com"
  }
]`;

  try {
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.9,
          max_tokens: 300,
        }),
      }
    );

    const json = await openaiRes.json();
    const raw = json.choices?.[0]?.message?.content || "";
    const content = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(content);

    res.status(200).json(parsed);
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "Failed to generate brand ideas." });
  }
}
