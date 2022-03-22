<script lang="ts">
  import { onMount } from 'svelte';
  import { reset as resetBasketStore } from '$lib/stores/basket';

  onMount(() => {
    resetBasketStore();
  });
  //TODO: have a thank you for your purchase thing here
</script>

<h1>success</h1>
