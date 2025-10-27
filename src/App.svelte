<script lang="ts">
  import { type GameName } from "./gameConfig";
  import { getPokemonForGame, type DexGroup } from "./pokemonData";

  let selectedGame = $state<GameName | null>(null);
  let dexGroups = $state<DexGroup[]>([]);
  let loading = $state(false);
  const teamSlots = Array(6).fill(null);

  const gameOptions: GameName[] = [
    "FireRed/LeafGreen",
    "Ruby/Sapphire",
    "Diamond/Pearl/Platinum",
    "HeartGold/SoulSilver",
    "Black/White",
    "Black/White 2",
    "X/Y",
    "Omega Ruby/Alpha Sapphire",
    "Ultra Sun/Ultra Moon",
    "Sword/Shield",
    "Legends: Arceus",
    "Scarlet/Violet",
    "Legends: Z-A",
  ];

  // Load pokemon when game changes
  async function loadPokemonForGame() {
    if (!selectedGame) {
      dexGroups = [];
      return;
    }
    loading = true;
    dexGroups = await getPokemonForGame(selectedGame);
    loading = false;
  }

  // When game changes, load pokemon
  $effect(() => {
    loadPokemonForGame();
  });
</script>

<main>
  <div class="game-selector">
    <label for="game-select">Select Game:</label>
    <select id="game-select" bind:value={selectedGame}>
      <option value={null}>-- Select a Game --</option>
      {#each gameOptions as game}
        <option value={game}>{game}</option>
      {/each}
    </select>
  </div>

  <div class="team-container">
    <h1>Your Team</h1>
    <div class="team-slots">
      {#each teamSlots as _slot}
        <div class="slot">
          <div class="pokemon-circle">
            <div class="circle-stripe"></div>
          </div>
          <div class="slot-label">???</div>
        </div>
      {/each}
    </div>
  </div>

  {#if loading}
    <div>Loading Pokemon...</div>
  {:else if dexGroups.length > 0}
    <div class="pokemon-lists">
      {#each dexGroups as dexGroup}
        <div class="dex-section">
          <h2>
            {dexGroup.dex
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l: string) => l.toUpperCase())}
          </h2>
          <div class="pokemon-grid">
            {#each dexGroup.pokemon as entry}
              <div class="pokemon-card">
                <div class="pokemon-name">
                  {entry.pokemon.name.charAt(0).toUpperCase() +
                    entry.pokemon.name.slice(1)}
                </div>
                <div class="pokemon-numbers">
                  #{entry.dexNumber.toString().padStart(3, "0")} - #{entry.pokemon.id
                    .toString()
                    .padStart(4, "0")}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style lang="scss">
  main {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
  }

  .game-selector {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    label {
      font-size: 1.1rem;
      font-weight: 600;
      color: #5b8fc7;
    }

    select {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border: 2px solid #6fa388;
      border-radius: 8px;
      background-color: white;
      color: #3d5a4d;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 500;

      &:hover {
        border-color: #5b8fc7;
        box-shadow: 0 2px 8px rgba(91, 143, 199, 0.2);
      }

      &:focus {
        outline: none;
        border-color: #5b8fc7;
        box-shadow: 0 0 0 3px rgba(91, 143, 199, 0.1);
      }
    }
  }

  .pokemon-lists {
    margin: 2rem 0;
    width: 100%;
    max-width: 1200px;
  }

  .dex-section {
    margin-bottom: 3rem;

    h2 {
      color: #5b8fc7;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
  }

  .pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
  }

  .pokemon-card {
    aspect-ratio: 1;
    border: 2px solid #6fa388;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #5b8fc7;
      box-shadow: 0 2px 8px rgba(91, 143, 199, 0.3);
      transform: translateY(-2px);
    }
  }

  .pokemon-name {
    font-weight: 600;
    color: #3d5a4d;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .pokemon-numbers {
    font-size: 0.75rem;
    color: #666;
  }

  .team-container {
    text-align: center;
    padding: 2rem;
  }

  h1 {
    color: #5b8fc7;
    font-size: 2rem;
    margin: 0 0 2rem 0;
    font-weight: 600;
  }

  .team-slots {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
  }

  .slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .pokemon-circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: linear-gradient(
      to bottom,
      #6fa388 0%,
      #6fa388 45%,
      #ffffff 45%,
      #ffffff 55%,
      #6fa388 55%,
      #6fa388 100%
    );
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .slot-label {
    background-color: #6fa388;
    color: #3d5a4d;
    padding: 1rem 3rem;
    border-radius: 12px;
    font-size: 1.25rem;
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
</style>
