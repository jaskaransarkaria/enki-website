<script lang="typescript">
  import { onMount } from 'svelte';
  import { reset as resetBasketStore } from '@/stores/basket';

  onMount(() => {
    resetBasketStore();
  });
  //TODO: have a thank you for your purchase thing here
</script>

<h1>success</h1>
