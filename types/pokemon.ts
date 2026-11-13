
export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[];
}

export interface PokemonAbility {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

export interface PokemonMove {
    move: NamedAPIResource;
}

export interface PokemonSprites {
    front_default: string | null;
    other?: {
        "official-artwork"?: {
            front_default: string | null;
            front_shiny?: string | null;
        };
        home?: {
            front_default: string | null;
        };
    };
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: PokemonAbility[];
    types: PokemonType[];
    stats: PokemonStat[];
    moves: PokemonMove[];
    sprites: PokemonSprites;
}
