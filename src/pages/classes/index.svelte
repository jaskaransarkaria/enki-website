<script lang="ts">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';
</script>

<div class="container">
  <div class="class-pics">
    <button class="class-button">
      <img
        in:fade={{ duration: 600 }}
        src="https://enki.imgix.net/group_portrait.png?auto=format,compress"
        alt="carton button with a hammer"
        on:click={$goto('./beginners')}
      />
    </button>
    <button class="class-button">
      <img
        in:fade={{ duration: 600 }}
        src="https://enki.imgix.net/wedding_portrait.png?auto=format,compress"
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
    min-height: 100%;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 5%;
  }

  .class-pics {
    display: flex;
    flex-direction: column;
    margin-bottom: 10%;
  }

  .class-button {
    border: none;
    background: none;
  }

  .class-button:hover {
    cursor: pointer;
  }

  .class-button > img {
    width: 80%;
    padding: 5px;
  }

  @media (min-width: 960px) {
    .class-pics {
      flex-direction: row;
      margin-bottom: 2%;
    }
  }

  @media (min-width: 2200px) {
    .class-pics {
      width: 50%;
      justify-content: space-evenly;
    }
    .class-button > img {
      width: 100%;
      padding: 5px;
      margin: 10px;
    }
  }
</style>
