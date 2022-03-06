<script lang="ts">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';
</script>

<div class="container">
  <div class="class-pics">
    <button class="class-button">
      <img
        in:fade={{ duration: 1200 }}
        src="https://enki.imgix.net/group.png?auto=format,compress"
        alt="carton button with a hammer"
        on:click={$goto('./beginners')}
      />
    </button>
    <button class="class-button">
      <img
        in:fade={{ duration: 1200 }}
        src="https://enki.imgix.net/wedding.png?auto=format,compress"
        alt="cartoon button with a boquet of flowers"
        on:click={$goto('./wedding-rings')}
      />
    </button>
    <div />
  </div>
</div>

<style>
  .container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    padding-top: 5%;
  }

  .class-pics {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 10%;
    justify-content: space-around;
    margin-bottom: 10%;
  }

  .class-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: none;
    background: none;
  }

  .class-button:hover {
    cursor: pointer;
  }

  .class-button > img {
    width: 100%;
    padding: 5px;
  }

  @media (min-width: 1280px) {
    .class-pics {
      flex-direction: row;
      width: 70%;
      margin-bottom: 2%;
    }
  }
</style>
