import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

export default function useBrandGenerator() {
  const [idea, setIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onGenerate = useCallback(
    debounce(() => {
      generateIdeas();
    }, 1000),
    [idea]
  );

  async function generateIdeas() {
    if (idea.trim().length < 10) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

    const prompt = `You are a branding expert. 
    Based on the following startup idea: "${idea}", 

    You will analyse this and understand what user actually want and will think on different perspectives based on the keywords in user idea

If the user's input is NOT related to generating a business idea OR does not contain enough information about their business or has some generic text that affect creating a quality brand name, then:

- Generate exactly one short follow-up message to ask the user for more details.
- Return ONLY valid JSON in this format (no text, no explanation):

[
  {
    "name": "Insert your generated follow-up message here."
  }
]

- Replace the text inside "name" with your actual generated follow-up message.
- Do NOT output the words "Insert your generated follow-up message here." or any placeholder.
-Do not include anything except valid JSON.


else
    Generate 3 meaningful brand identity options that is related to user requirement. For example if user entered details related to restaunrant then generate something that is eas to remember and fulfuill all that user asked for.
   Each options should include:
  - A unique brand name
  - A catchy and creative tagline
  - A short, available domain name, generate domain name that is not generic and most probaby available which is not already registered

  Return ONLY valid JSON in this format (no text, no explanation):

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
]


`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      if (!res.ok) throw new Error("API error");

      const responseData = await res.json();
      setResult(responseData);
    } catch (err) {
      console.error(err);
      setError("Failed to generate brand ideas. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    idea,
    setIdea,
    result,
    isLoading,
    error,
    onGenerate,
  };
}
