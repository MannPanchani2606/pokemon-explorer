import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getPokemonDetails, getPokemonImageUrl } from "@/lib/api";

import type { Pokemon } from "@/types/pokemon";

interface PokemonPageProps {
  params: Promise<{
    id: string;
  }>;
}

const typeStyles: Record<string, string> = {
  fire: "bg-orange-100 text-orange-700",
  water: "bg-blue-100 text-blue-700",
  grass: "bg-green-100 text-green-700",
  electric: "bg-yellow-100 text-yellow-800",
  bug: "bg-lime-100 text-lime-800",
  normal: "bg-stone-100 text-stone-700",
  poison: "bg-purple-100 text-purple-700",
  ground: "bg-amber-100 text-amber-800",
  fairy: "bg-pink-100 text-pink-700",
  fighting: "bg-red-100 text-red-700",
  psychic: "bg-fuchsia-100 text-fuchsia-700",
  rock: "bg-yellow-100 text-yellow-900",
  ghost: "bg-indigo-100 text-indigo-700",
  ice: "bg-cyan-100 text-cyan-700",
  dragon: "bg-violet-100 text-violet-700",
  dark: "bg-slate-200 text-slate-800",
  steel: "bg-slate-100 text-slate-700",
  flying: "bg-sky-100 text-sky-700",
};

// Main Pokémon detail component
async function PokemonContent({ id }: { id: string }) {
  let pokemon: Pokemon;

  try {
    pokemon = await getPokemonDetails(id);
  } catch {
    notFound();
  }

  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default ||
    getPokemonImageUrl(pokemon.id);

  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <main className="min-h-screen bg-[#f7f8fc]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-red-50 hover:text-red-600"
        >
          ← Back to Pokémon
        </Link>

        {/* Pokémon Header */}
        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div className="flex items-center justify-center rounded-3xl bg-white p-8 shadow-sm">
            <img
              src={imageUrl}
              alt={pokemonName}
              width="400"
              height="400"
              className="h-64 w-64 object-contain sm:h-80 sm:w-80"
            />
          </div>

          {/* Basic Information */}
          <div className="flex flex-col justify-center rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-red-500">
              Pokémon #{String(pokemon.id).padStart(3, "0")}
            </p>

            <h1 className="mt-3 text-4xl font-black capitalize text-slate-900 sm:text-5xl">
              {pokemonName}
            </h1>

            {/* Types */}
            <div className="mt-6 flex flex-wrap gap-3">
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className={`rounded-full px-5 py-2 text-sm font-bold capitalize ${
                    typeStyles[type.name] || "bg-slate-100 text-slate-700"
                  }`}
                >
                  {type.name}
                </span>
              ))}
            </div>

            {/* Height and Weight */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Height
                </p>

                <p className="mt-2 text-2xl font-black text-slate-900">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Weight
                </p>

                <p className="mt-2 text-2xl font-black text-slate-900">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Abilities */}
        <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Abilities</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {pokemon.abilities.map(({ ability, is_hidden }) => (
              <div
                key={ability.name}
                className="rounded-xl bg-purple-50 px-5 py-3"
              >
                <p className="font-bold capitalize text-purple-700">
                  {ability.name.replace("-", " ")}
                </p>

                {is_hidden && (
                  <p className="mt-1 text-xs text-purple-500">Hidden Ability</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Base Stats */}
        <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Base Stats</h2>

          <div className="mt-6 space-y-5">
            {pokemon.stats.map(({ stat, base_stat }) => (
              <div key={stat.name}>
                <div className="mb-2 flex justify-between gap-4">
                  <span className="text-sm font-semibold capitalize text-slate-600">
                    {stat.name.replace("-", " ")}
                  </span>

                  <span className="text-sm font-black text-slate-900">
                    {base_stat}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all"
                    style={{
                      width: `${Math.min((base_stat / 255) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Moves */}
        <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Moves</h2>

          <p className="mt-2 text-sm text-slate-500">
            Showing the first 12 available moves.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {pokemon.moves.slice(0, 12).map(({ move }) => (
              <span
                key={move.name}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold capitalize text-slate-600"
              >
                {move.name.replace("-", " ")}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-200 py-8 text-center">
          <p className="text-sm text-slate-400">
            Pokémon Explorer · Powered by PokéAPI
          </p>
        </footer>
      </div>
    </main>
  );
}

// Default Next.js page component
export default function PokemonPage({ params }: PokemonPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc]">
          <p className="text-lg font-semibold text-slate-600">
            Loading Pokémon details...
          </p>
        </div>
      }
    >
      {params.then(({ id }) => (
        <PokemonContent id={id} />
      ))}
    </Suspense>
  );
}
