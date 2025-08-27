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
