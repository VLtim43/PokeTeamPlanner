/**
 * Build Pokemon SQLite Database
 *
 * This script fetches the national pokedex from PokeAPI and creates
 * a SQLite database with all Pokemon.
 *
 * Usage: node scripts/buildDatabase.js
 */

import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import { dirname } from "path";

const DB_PATH = "public/data/pokemon.db";
const BASE_URL = "https://pokeapi.co/api/v2";

// Ensure directory exists
mkdirSync(dirname(DB_PATH), { recursive: true });

// Create database
const db = new Database(DB_PATH);

console.log("Creating database schema...");

// Create table with all regional dexes
db.exec(`
  CREATE TABLE IF NOT EXISTS pokemon (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,

    -- Regional Pokedex numbers
    kanto INTEGER,
    updated_johto INTEGER,
    updated_hoenn INTEGER,
    extended_sinnoh INTEGER,
    updated_unova INTEGER,
    kalos_central INTEGER,
    kalos_coastal INTEGER,
    kalos_mountain INTEGER,
    updated_alola INTEGER,
    galar INTEGER,
    isle_of_armor INTEGER,
    crown_tundra INTEGER,
    hisui INTEGER,
    paldea INTEGER,
    kitakami INTEGER,
    blueberry INTEGER
  );
`);

console.log("Schema created successfully!");

console.log("\nFetching national pokedex...");

const response = await fetch(`${BASE_URL}/pokedex/national`);
if (!response.ok) {
  throw new Error(`Failed to fetch national pokedex: ${response.statusText}`);
}

const nationalDex = await response.json();
console.log(
  `Found ${nationalDex.pokemon_entries.length} Pokemon in national dex`
);

const insert = db.prepare(`
  INSERT INTO pokemon (id, name)
  VALUES (?, ?)
`);

// Insert all Pokemon
console.log("\nInserting Pokemon into database...");
const insertMany = db.transaction((entries) => {
  for (const entry of entries) {
    // Extract Pokemon ID from the species URL
    // URL format: https://pokeapi.co/api/v2/pokemon-species/{id}/
    const id = parseInt(entry.pokemon_species.url.split("/").slice(-2)[0]);
    const name = entry.pokemon_species.name;

    insert.run(id, name);
  }
});

insertMany(nationalDex.pokemon_entries);

const count = db.prepare("SELECT COUNT(*) as count FROM pokemon").get();
console.log(`\n✓ Successfully inserted ${count.count} Pokemon into database`);
console.log(`✓ Database saved to: ${DB_PATH}`);

db.close();
console.log("\n✓ Database build complete!");
