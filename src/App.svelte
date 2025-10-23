<script>
  const teamSlots = Array(6).fill(null);
</script>

<main>
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
    align-items: center;
    justify-content: center;
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
