export default function ResultCard({data}){

    const { name, tagline, domain} = data;

    const copy = (text) => navigator.clipboard.writeText(text);


return (
    <div className="rounded-xl bg-gray-800 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-purple-300">{name}</div>
          <div className="text-gray-300 mt-1">{tagline}</div>
          <div className="text-green-400 mt-2">{domain}</div>
        </div>
        <button
          onClick={() => copy(domain)}
          className="self-start bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded-lg"
          title="Copy domain"
        >
          Copy
        </button>
      </div>
    </div>
  );

}