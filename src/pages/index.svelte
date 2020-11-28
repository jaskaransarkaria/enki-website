<script lang="ts">
  import { url } from '@roxi/routify';
  import Checkout from '../components/Checkout.svelte';

  export let scoped: any;
  $: ({ name } = scoped);
</script>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>

<div>
  <h1>Hello {name}!</h1>
  <!-- absolute -->
  <a href={$url('/about')}>About page</a>
  <Checkout />
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</div>
