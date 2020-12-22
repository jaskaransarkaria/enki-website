<script lang="ts">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';

  // this is how to pass down a prop from the router
  // export let scoped: any;
  // $: ({ name } = scoped);

  let swing = true;
</script>

<style>
  .homepage-background {
    display: grid;
    grid-template-rows: 20% auto 10%;
    grid-template-columns: 25% 31% 10% 24% 10%;
    width: 100vw;
    height: 100vh;
    background-size: 100vw 100%;
    background-image: url('/outside-enki.png');
    background-repeat: no-repeat;
  }

  .open-sign-button,
  .open-sign-button:active {
    grid-row: 2;
    grid-column: 3;
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    animation-duration: 3s;
    animation-fill-mode: both;
  }

  .open-sign-button:hover {
    animation-play-state: running;
  }
  img {
    width: 10vw;
    height: 16vh;
  }

  @keyframes swing {
    20% {
      transform: rotate(7.5deg);
    }
    40% {
      transform: rotate(-4deg);
    }
    60% {
      transform: rotate(2.5deg);
    }
    80% {
      transform: rotate(-2.5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .swing {
    animation-name: swing;
    transform-origin: top center;
  }

  @media only screen and (min-width: 960px) {
  }
</style>

<main class="homepage-background" in:fade>
  <button
    class="open-sign-button"
    class:swing
    on:mouseover={() => (swing = true)}
    on:mouseout={() => (swing = false)}
    on:click={$goto('/what-we-offer')}>
    <img src="/open.png" alt="shop open sign" />
  </button>
</main>
