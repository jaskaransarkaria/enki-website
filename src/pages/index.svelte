<script lang="ts">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';

  // this is how to pass down a prop from the router
  // export let scoped: any;
  // $: ({ name } = scoped);
</script>

<style>
  .homepage-background {
    display: grid;
    grid-template-rows: 20% auto 10%;
    grid-template-columns: 25% auto 10%;
    width: 100vw;
    height: 100vh;
    background-size: 100vw 100%;
    background-image: url('/outside-enki.png');
    background-repeat: no-repeat;
  }

  @media only screen and (min-width: 960px) {
  }
</style>

<main class="homepage-background" on:click={$goto('/enki')} in:fade />
