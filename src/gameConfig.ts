/**
 * Game Configuration
 *
 * Maps each Pokemon game to its corresponding regional Pokedex columns in the database.
 * Some games have multiple dexes (e.g., Kalos has 3, DLC games have additional dexes).
 */

// Regional Pokedex column names in the database
export type RegionalDex =
  | 'kanto'
  | 'updated_johto'
  | 'updated_hoenn'
  | 'extended_sinnoh'
  | 'updated_unova'
  | 'kalos_central'
  | 'kalos_coastal'
  | 'kalos_mountain'
  | 'updated_alola'
  | 'galar'
  | 'isle_of_armor'
  | 'crown_tundra'
  | 'hisui'
  | 'paldea'
  | 'kitakami'
  | 'blueberry';

// All available Pokemon games
export type GameName =
  | 'FireRed/LeafGreen'
  | 'Ruby/Sapphire'
  | 'Diamond/Pearl/Platinum'
  | 'HeartGold/SoulSilver'
  | 'Black/White'
  | 'Black/White 2'
  | 'X/Y'
  | 'Omega Ruby/Alpha Sapphire'
  | 'Ultra Sun/Ultra Moon'
  | 'Sword/Shield'
  | 'Legends: Arceus'
  | 'Scarlet/Violet'
  | 'Legends: Z-A';

// Region names
export type RegionName =
  | 'Kanto'
  | 'Johto'
  | 'Hoenn'
  | 'Sinnoh'
  | 'Unova'
  | 'Kalos'
  | 'Alola'
  | 'Galar'
  | 'Hisui'
  | 'Paldea';

// Game configuration structure
export interface GameConfig {
  dexes: RegionalDex[];
  region: RegionName;
}

// Pokemon database row structure
export interface Pokemon {
  id: number;
  name: string;
  kanto?: number | null;
  updated_johto?: number | null;
  updated_hoenn?: number | null;
  extended_sinnoh?: number | null;
  updated_unova?: number | null;
  kalos_central?: number | null;
  kalos_coastal?: number | null;
  kalos_mountain?: number | null;
  updated_alola?: number | null;
  galar?: number | null;
  isle_of_armor?: number | null;
  crown_tundra?: number | null;
  hisui?: number | null;
  paldea?: number | null;
  kitakami?: number | null;
  blueberry?: number | null;
}

// Mapping of games to their regional dexes
export const GAME_DEX_MAPPING: Record<GameName, GameConfig> = {
  'FireRed/LeafGreen': {
    dexes: ['kanto'],
    region: 'Kanto'
  },
  'Ruby/Sapphire': {
    dexes: ['updated_hoenn'],
    region: 'Hoenn'
  },
  'Diamond/Pearl/Platinum': {
    dexes: ['extended_sinnoh'],
    region: 'Sinnoh'
  },
  'HeartGold/SoulSilver': {
    dexes: ['updated_johto'],
    region: 'Johto'
  },
  'Black/White': {
    dexes: ['updated_unova'],
    region: 'Unova'
  },
  'Black/White 2': {
    dexes: ['updated_unova'],
    region: 'Unova'
  },
  'X/Y': {
    dexes: ['kalos_central', 'kalos_coastal', 'kalos_mountain'],
    region: 'Kalos'
  },
  'Omega Ruby/Alpha Sapphire': {
    dexes: ['updated_hoenn'],
    region: 'Hoenn'
  },
  'Ultra Sun/Ultra Moon': {
    dexes: ['updated_alola'],
    region: 'Alola'
  },
  'Sword/Shield': {
    dexes: ['galar', 'isle_of_armor', 'crown_tundra'],
    region: 'Galar'
  },
  'Legends: Arceus': {
    dexes: ['hisui'],
    region: 'Hisui'
  },
  'Scarlet/Violet': {
    dexes: ['paldea', 'kitakami', 'blueberry'],
    region: 'Paldea'
  },
  'Legends: Z-A': {
    dexes: ['kalos_central', 'kalos_coastal', 'kalos_mountain'],
    region: 'Kalos'
  }
};

/**
 * Get the regional dex columns for a specific game
 */
export function getDexesForGame(gameName: GameName): RegionalDex[] {
  return GAME_DEX_MAPPING[gameName]?.dexes || [];
}

/**
 * Get the region name for a specific game
 */
export function getRegionForGame(gameName: GameName): RegionName | 'Unknown' {
  return GAME_DEX_MAPPING[gameName]?.region || 'Unknown';
}

/**
 * Check if a Pokemon is available in a specific game based on its regional dex data
 */
export function isPokemonInGame(pokemon: Pokemon, gameName: GameName): boolean {
  const dexes = getDexesForGame(gameName);
  return dexes.some(dex => pokemon[dex] !== null && pokemon[dex] !== undefined);
}
