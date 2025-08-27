import './App.css';
import Header from './components/Header';
import IdeaInput from './components/IdeaInput';
import ResultList from "./components/ResultList";
import ErrorBoundary from './components/ErrorBoundry';
import useBrandGenerator from './hooks/useBrandGenerator';




export default function App() {

const {
    idea,
    setIdea,
    result,
    isLoading,
    error,
    onGenerate,
  } = useBrandGenerator();


  

  return (
    <div className='min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center'>
      <div className='w-full max-w-3xl'> 
      <Header />
       <IdeaInput idea={idea} setIdea={setIdea} onGenerate={onGenerate} isLoading={isLoading} />

      {isLoading &&  (<div className="mt-6 flex items-center gap-3 text-white/80"><div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            Generating ideas…
          </div>)}
      
       {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 text-red-300 px-3 py-2 border border-red-500/30">
            {error}
          </div>
        )}
        
        <ErrorBoundary>
        {result && <ResultList items={result} />}
        </ErrorBoundary>
        
      </div>
    </div>
    
  )
}
