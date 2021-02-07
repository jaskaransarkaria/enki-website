<script lang="ts">
  import { goto } from '@roxi/routify';
  import AddToBasket from '#/components/AddToBasket/AddToBasket.svelte';
  import type { Product } from '#/types/product';

  export let product: Product;
</script>

<style>
  .container {
    border: 2px solid salmon;
  }
</style>

<div class="container">
  <button>
    {`${product.Name} -- ${product.Id} -- ${product.SalePrice} -- ${product.ProductImages[0]}`}
  </button>
  <AddToBasket productId={product.Id.toString()} />
  <button on:click={$goto('/payment/checkout')}> Goto Checkout </button>
</div>
