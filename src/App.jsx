import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import IdeaInput from './components/IdeaInput';
import ResultList from "./components/ResultList";




export default function App() {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult]= useState(null);
  const [error, setError] = useState(null);

  async function onGenerate(){
    if (idea.trim().length<10) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

    const prompt = `You are a branding expert. 
    Based on the following startup idea: "${idea}",
    
  Genrate 3 brand identity options. Each options should include:
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

      try{
        const res= await fetch("https://api.openai.com/v1/chat/completions",{
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o", 
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 300
      })
    });


      const json = await res.json();
    const raw = json.choices?.[0]?.message?.content || "";
const content = raw.replace(/```json|```/g, "").trim();

    // Parse the JSON text response
    const parsed = JSON.parse(content);

    const resultsWithId = parsed.map((item, index) => ({
      name: item.name,
      tagline: item.tagline,
      domain: item.domain
    }));

    setResult(resultsWithId);

    

    
  }
catch (err) {
    console.error(err);
    setError("Failed to generate brand ideas. Please try again.");
  } finally {
    setIsLoading(false);
  }
}

  return (
    <div className='min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center'>
      <div className='w-full max-w-2xl'> 
      <Header />
       <IdeaInput idea={idea} setIdea={setIdea} onGenerate={onGenerate} />

      {isLoading &&  (<div className="mt-6 flex items-center gap-3 text-white/80"><div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            Generating ideas…
          </div>)}
      
       {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 text-red-300 px-3 py-2 border border-red-500/30">
            {error}
          </div>
        )}

        {result && <ResultList items={result} />}
      </div>
    </div>
    
  )
}
