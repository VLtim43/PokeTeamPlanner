<script lang="ts">
  import { getDexesForGame, getRegionForGame, type GameName } from './gameConfig';

  let selectedGame = $state<GameName>('FireRed/LeafGreen');
  const teamSlots = Array(6).fill(null);

  const gameOptions: GameName[] = [
    'FireRed/LeafGreen',
    'Ruby/Sapphire',
    'Diamond/Pearl/Platinum',
    'HeartGold/SoulSilver',
    'Black/White',
    'Black/White 2',
    'X/Y',
    'Omega Ruby/Alpha Sapphire',
    'Ultra Sun/Ultra Moon',
    'Sword/Shield',
    'Legends: Arceus',
    'Scarlet/Violet',
    'Legends: Z-A'
  ];

  // You can now use these helper functions to get the dexes for the selected game
  $effect(() => {
    const dexes = getDexesForGame(selectedGame);
    const region = getRegionForGame(selectedGame);
    console.log(`Selected game: ${selectedGame}`);
    console.log(`Region: ${region}`);
    console.log(`Dexes:`, dexes);
  });
</script>

<main>
  <div class="game-selector">
    <label for="game-select">Select Game:</label>
    <select id="game-select" bind:value={selectedGame}>
      {#each gameOptions as game}
        <option value={game}>{game}</option>
      {/each}
    </select>
  </div>

  <div class="team-container">
    <h1>Your Team</h1>
    <div class="team-slots">
      {#each teamSlots as slot, index}
        <div class="slot">
          <div class="pokemon-circle">
            <div class="circle-stripe"></div>
          </div>
          <div class="slot-label">???</div>
        </div>
      {/each}
    </div>
  </div>
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
    background: linear-gradient(to bottom, #6fa388 0%, #6fa388 45%, #ffffff 45%, #ffffff 55%, #6fa388 55%, #6fa388 100%);
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
