<script lang="ts">
  import { url } from '@roxi/routify';
  import { fade } from 'svelte/transition';

  // this is how to pass down a prop from the router
  // export let scoped: any;
  // $: ({ name } = scoped);

  let selected = false;
</script>

<style>
  .homepage-background {
    width: 80vw;
    height: 100vh;
    background-image: url('/outer-shop.png');
    background-repeat: no-repeat;
    /* border: lawngreen 5px solid; */
  }

  .homepage-background.selected {
    background-image: url('/homepage-mock.jpeg');
  }
</style>

<main
  class="homepage-background"
  class:selected
  on:click={() => (selected = !selected)}
  in:fade>
  <!-- absolute -->
  <a href={$url('/about')}>About page</a>
  <a href={$url('/services')}>Repairs and commissions</a>
</main>
