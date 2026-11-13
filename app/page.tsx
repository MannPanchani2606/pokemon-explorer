import PokemonExplorer from "@/components/PokemonExplorer";
import { getPokemonList } from "@/lib/api";

export default async function HomePage() {
  const data = await getPokemonList();

  return <PokemonExplorer pokemon={data.results} totalCount={data.count} />;
}
