import ResultCard from "./ResultCard";

export default function ResultsList({ items }) {
  return (
    <div className="mt-6 grid gap-4">
      {items.map( (item) =>(
          <ResultCard key={item.domain} data={item} />

      )

      )}
    </div>
  );
}