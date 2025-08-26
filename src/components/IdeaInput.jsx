import { useEffect, useRef } from 'react';

function IdeaInput({idea, setIdea, onGenerate}){
       const inputRef = useRef();

       useEffect(()=>{
         inputRef.current?.focus();  
       },[]);
 

       return (
       <div className="flex flex-col gap-4">
        <textarea className="p-3 rounded-lg bg-gray-800 text-white resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Enter your business idea..."
        value={idea}
        ref = {inputRef}
        onChange={(e) => setIdea(e.target.value)}
        />
        <button disabled={idea.trim().length < 10} onClick={onGenerate}
        className='bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl transition-all disabled:bg-gray-500'>
        Generate Ideas
        </button>
       </div>
       );

}

export default IdeaInput;