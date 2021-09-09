<script lang="typescript">
  import { onMount } from 'svelte';
  import { reset as resetBasketStore } from '@/stores/basket';

  onMount(() => {
    resetBasketStore();
  });
</script>

<h1>success</h1>
