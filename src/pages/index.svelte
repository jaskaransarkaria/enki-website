<script lang="ts">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';

  // this is how to pass down a prop from the router
  // export let scoped: any;
  // $: ({ name } = scoped);
</script>

<div class="container">
  <div transition:fade={{ duration: 1000 }} class="parallax">
    <h1>Welcome</h1>
  </div>
  <div class="inside-shop" />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    z-index: 99;
    color: white;
    background-color: rgba(236, 236, 236, 0.7);
    width: 100%;
    text-align: center;
  }

  .parallax {
    /* The image used */
    background-image: url('/outside-enki.webp');

    /* Set a specific height */
    min-height: 1500px;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: opacity 2s;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .parallax:hover {
    opacity: 0.95;
  }

  .inside-shop {
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    width: 100%;
    height: 100vh;
  }

  @media (min-width: 2400px) {
    .inside-shop {
      background-image: url('/inside-enki-1824.webp');
    }
  }
</style>
