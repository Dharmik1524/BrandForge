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

  const onGenerate=() =>{
    if (idea.trim().length<5) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    setTimeout(()=>{
     const base= idea.trim().slice(0,12).replace(/\s+/g,"");
     const list = [
        {
          name: `${base} Labs`,
          tagline: "Turn ideas into identity.",
          domain: `${base.toLowerCase()}labs.com`,
        },
        {
          name: `${base} Hub`,
          tagline: "Naming that clicks.",
          domain: `${base.toLowerCase()}hub.com`,
        },
        {
          name: `${base}ly`,
          tagline: "Your brand, born fast.",
          domain: `${base.toLowerCase()}ly.com`,
        },
      ];
      setResult(list);
      setIsLoading(false);
    },1200);
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
