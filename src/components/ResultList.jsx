import ResultCard from "./ResultCard";

export default function ResultsList({ items }) {
  return (
    <div className="mt-6 grid gap-4">
      {items.map( (item) =>(
        <div key={item.name}
          className="animate-[fadeIn_1.5s_ease-out_forwards]"
        >
          <ResultCard key={item.name} data={item} />
          </div>
      )

      )}
    </div>
  );
}

