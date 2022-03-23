<script context="module">
	import { browser } from '$app/env';

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>
<script lang="ts">
  import { onMount } from 'svelte';
  import { reset as resetBasketStore } from '$lib/stores/basket';

  onMount(() => {
    resetBasketStore();
  });
  //TODO: have a thank you for your purchase thing here
</script>

<h1>success</h1>
