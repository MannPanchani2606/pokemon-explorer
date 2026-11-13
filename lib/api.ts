
import type {
    Pokemon,
    PokemonListResponse,
} from "@/types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";

// Fetch the complete Pokémon listing
export async function getPokemonList(): Promise<PokemonListResponse> {
    const response = await fetch(
        `${API_BASE_URL}/pokemon?limit=100000&offset=0`,
        {
            next: { revalidate: 3600 },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch Pokémon list");
    }

    return response.json();
}

// Fetch individual Pokémon details
export async function getPokemonDetails(
    nameOrId: string | number
): Promise<Pokemon> {
    const response = await fetch(
        `${API_BASE_URL}/pokemon/${encodeURIComponent(
            String(nameOrId).toLowerCase()
        )}`,
        {
            next: { revalidate: 3600 },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
    }

    return response.json();
}

// Extract Pokémon ID from its API URL
export function getPokemonIdFromUrl(url: string): number {
    const segments = url.split("/").filter(Boolean);

    return Number(segments[segments.length - 1]);
}

// Generate official Pokémon artwork URL
export function getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
