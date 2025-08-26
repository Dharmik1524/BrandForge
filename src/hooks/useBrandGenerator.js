import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import brandPrompt from "../secret/prompt";

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

    const prompt = brandPrompt(idea);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.9,
          max_tokens: 300,
        }),
      });

      const json = await res.json();
      const raw = json.choices?.[0]?.message?.content || "";
      const content = raw.replace(/```json|```/g, "").trim();

      // Parse the JSON text response
      const parsed = JSON.parse(content);

      const resultsWithId = parsed.map((item, index) => ({
        name: item.name,
        tagline: item.tagline,
        domain: item.domain,
      }));

      setResult(resultsWithId);
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
