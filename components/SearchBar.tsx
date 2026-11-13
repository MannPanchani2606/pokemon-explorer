interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <label htmlFor="pokemon-search" className="sr-only">
        Search Pokémon by name
      </label>

      <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-red-400 focus-within:ring-4 focus-within:ring-red-100">
        <svg
          className="h-5 w-5 shrink-0 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>

        <input
          id="pokemon-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search Pokémon by name..."
          className="w-full bg-transparent px-3 py-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="rounded-lg px-2 py-1 text-sm font-semibold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
