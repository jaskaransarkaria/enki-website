<script lang="ts">
  import Checkout from '@/components/Checkout/Checkout.svelte';
  import { basket } from '@/stores/basket';

  console.log('Checkout', $basket);
</script>

<h1>Checkout</h1>
<Checkout />
