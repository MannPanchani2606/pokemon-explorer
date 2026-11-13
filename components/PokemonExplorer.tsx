"use client";

import { useMemo, useState } from "react";
import type { NamedAPIResource } from "@/types/pokemon";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";
import { getPokemonIdFromUrl } from "@/lib/api";

interface PokemonExplorerProps {
  pokemon: NamedAPIResource[];
  totalCount: number;
}

const PAGE_SIZE = 24;

export default function PokemonExplorer({
  pokemon,
  totalCount,
}: PokemonExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Filter the complete Pokémon list, not just visible cards
  const filteredPokemon = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return pokemon;
    }

    return pokemon.filter((item) => item.name.toLowerCase().includes(query));
  }, [pokemon, searchQuery]);

  // Display only the required number of cards
  const visiblePokemon = filteredPokemon.slice(0, visibleCount);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f7f8fc]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Your ultimate Pokémon
            </div>

            <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Explore the world
                  <br />
                  of <span className="text-red-600">Pokémon.</span>
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                  Discover your favorite Pokémon, learn about their abilities,
                  and explore the complete Pokémon universe.
                </p>
              </div>

              <div className="flex gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-2xl">
                  ⚡
                </div>

                <div>
                  <p className="text-2xl font-black text-slate-900">
                    {totalCount.toLocaleString()}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pokémon available
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Search Section */}
          <section className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:max-w-md">
                <SearchBar value={searchQuery} onChange={handleSearch} />
              </div>

              <p
                className="text-sm font-medium text-slate-500"
                aria-live="polite"
              >
                {filteredPokemon.length.toLocaleString()} Pokémon found
              </p>
            </div>
          </section>

          {/* Pokémon Grid */}
          <section>
            {visiblePokemon.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-4">
                {visiblePokemon.map((item) => {
                  const id = getPokemonIdFromUrl(item.url);

                  return <PokemonCard key={id} id={id} name={item.name} />;
                })}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center">
                <p className="text-xl font-bold text-slate-800">
                  No Pokémon found
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Try searching with another Pokémon name.
                </p>

                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  className="mt-5 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>

          {/* Load More */}
          {visibleCount < filteredPokemon.length && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((current) => current + PAGE_SIZE)
                }
                className="rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-600"
              >
                Load More Pokémon
              </button>
            </div>
          )}

          {/* Footer Information */}
          <footer className="mt-16 border-t border-slate-200 pt-8 text-center">
            <p className="text-sm text-slate-400">
              Pokémon Explorer · Powered by PokéAPI
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
