import Link from "next/link";
import { getPokemonImageUrl } from "@/lib/api";

interface PokemonCardProps {
  id: number;
  name: string;
}

export default function PokemonCard({ id, name }: PokemonCardProps) {
  const formattedId = String(id).padStart(3, "0");

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Link
      href={`/pokemon/${id}`}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-100/60"
    >
      <span className="absolute right-5 top-5 text-sm font-bold text-slate-300">
        #{formattedId}
      </span>

      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
        <div className="absolute h-36 w-36 rounded-full bg-red-100/50 transition duration-300 group-hover:scale-125" />

        <img
          src={getPokemonImageUrl(id)}
          alt={`${displayName} official artwork`}
          width="220"
          height="220"
          loading="lazy"
          className="relative z-10 h-44 w-44 object-contain transition duration-300 group-hover:scale-110"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Pokémon #{formattedId}
          </p>

          <h2 className="mt-1 text-lg font-bold capitalize text-slate-900">
            {displayName}
          </h2>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
