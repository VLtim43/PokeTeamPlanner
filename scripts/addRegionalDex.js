/**
 * Add Regional Pokedex Data to Database
 *
 * This script fetches a regional pokedex from PokeAPI and updates
 * the corresponding column in the database.
 *
 * Usage: node scripts/addRegionalDex.js <pokedex-name>
 * Examples:
 *   node scripts/addRegionalDex.js updated-hoenn
 *   node scripts/addRegionalDex.js galar
 *   node scripts/addRegionalDex.js paldea
 */

import Database from "better-sqlite3";

const DB_PATH = "public/data/pokemon.db";
const BASE_URL = "https://pokeapi.co/api/v2";

// Map pokedex names to database column names
const POKEDEX_COLUMN_MAP = {
  "kanto": "kanto",
  "updated-johto": "updated_johto",
  "updated-hoenn": "updated_hoenn",
  "extended-sinnoh": "extended_sinnoh",
  "updated-unova": "updated_unova",
  "kalos-central": "kalos_central",
  "kalos-coastal": "kalos_coastal",
  "kalos-mountain": "kalos_mountain",
  "updated-alola": "updated_alola",
  "galar": "galar",
  "isle-of-armor": "isle_of_armor",
  "crown-tundra": "crown_tundra",
  "hisui": "hisui",
  "paldea": "paldea",
  "kitakami": "kitakami",
  "blueberry": "blueberry"
};

async function fetchRegionalPokedex(pokedexName) {
  console.log(`Fetching ${pokedexName} pokedex...`);

  const response = await fetch(`${BASE_URL}/pokedex/${pokedexName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch pokedex: ${response.statusText}`);
  }

  const pokedex = await response.json();
  console.log(`Found ${pokedex.pokemon_entries.length} Pokemon in ${pokedex.name}`);

  return pokedex;
}

async function updateDatabase(pokedexName) {
  const columnName = POKEDEX_COLUMN_MAP[pokedexName];

  if (!columnName) {
    throw new Error(`Unknown pokedex: ${pokedexName}. Valid names: ${Object.keys(POKEDEX_COLUMN_MAP).join(", ")}`);
  }

  // Fetch regional pokedex
  const pokedex = await fetchRegionalPokedex(pokedexName);

  // Open database
  const db = new Database(DB_PATH);

  // Prepare update statement
  const update = db.prepare(`
    UPDATE pokemon
    SET ${columnName} = ?
    WHERE id = ?
  `);

  // Update all Pokemon in this regional dex
  console.log(`\nUpdating database column: ${columnName}...`);
  const updateMany = db.transaction((entries) => {
    for (const entry of entries) {
      // Extract Pokemon ID from the species URL
      const id = parseInt(entry.pokemon_species.url.split("/").slice(-2)[0]);
      const regionalNumber = entry.entry_number;

      update.run(regionalNumber, id);
    }
  });

  updateMany(pokedex.pokemon_entries);

  // Verify
  const count = db.prepare(`SELECT COUNT(*) as count FROM pokemon WHERE ${columnName} IS NOT NULL`).get();
  console.log(`✓ Successfully updated ${count.count} Pokemon in ${columnName} column`);

  // Show sample
  console.log(`\nSample data (first 5 Pokemon in ${pokedexName}):`);
  const sample = db.prepare(`SELECT id, name, ${columnName} FROM pokemon WHERE ${columnName} IS NOT NULL ORDER BY ${columnName} LIMIT 5`).all();
  console.table(sample);

  db.close();
  console.log(`\n✓ Regional dex update complete!`);
}

// Main execution
const args = process.argv.slice(2);
const pokedexName = args[0];

if (!pokedexName || args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage: node scripts/addRegionalDex.js <pokedex-name>

Available pokedexes:
  ${Object.keys(POKEDEX_COLUMN_MAP).join("\n  ")}

Examples:
  node scripts/addRegionalDex.js updated-hoenn
  node scripts/addRegionalDex.js galar
  node scripts/addRegionalDex.js paldea
  `);
  process.exit(pokedexName ? 0 : 1);
}

updateDatabase(pokedexName).catch(error => {
  console.error("Error updating regional dex:", error);
  process.exit(1);
});
