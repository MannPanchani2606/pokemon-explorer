import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-xl font-black text-white shadow-lg shadow-red-200">
            P
          </span>

          <span>
            <span className="block text-lg font-black tracking-tight text-slate-900">
              PokémonExplorer
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Discover the Pokémon world
            </span>
          </span>
        </Link>

        <span className="hidden rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600 sm:block">
          Pokémon Explorer
        </span>
      </div>
    </header>
  );
}
