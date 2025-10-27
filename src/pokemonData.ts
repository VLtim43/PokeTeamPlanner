import type { Pokemon, GameName, RegionalDex } from './gameConfig';
import { getDexesForGame } from './gameConfig';

let pokemonCache: Pokemon[] | null = null;

export interface PokemonInDex {
  pokemon: Pokemon;
  dexNumber: number;
}

export interface DexGroup {
  dex: RegionalDex;
  pokemon: PokemonInDex[];
}

/**
 * Load the pokemon data from the JSON file
 */
export async function loadPokemonData(): Promise<Pokemon[]> {
  if (pokemonCache) {
    return pokemonCache;
  }

  const response = await fetch('/data/pokemon.json');
  pokemonCache = await response.json();
  return pokemonCache as Pokemon[];
}

/**
 * Get all Pokemon available in a game, grouped by dex
 */
export async function getPokemonForGame(gameName: GameName): Promise<DexGroup[]> {
  const allPokemon = await loadPokemonData();
  const dexes = getDexesForGame(gameName);

  return dexes.map(dex => {
    const pokemonInDex = allPokemon
      .filter(pokemon => pokemon[dex] !== null && pokemon[dex] !== undefined)
      .map(pokemon => ({
        pokemon,
        dexNumber: pokemon[dex] as number
      }))
      .sort((a, b) => a.dexNumber - b.dexNumber);

    return {
      dex,
      pokemon: pokemonInDex
    };
  });
}
