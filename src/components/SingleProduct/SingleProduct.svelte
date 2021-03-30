<script lang="ts">
  import { goto } from '@roxi/routify';
  import AddToBasket from '@/components/AddToBasket/AddToBasket.svelte';
  import type { Product } from '@/types/product';

  export let product: Product;
</script>

<style>
  .container {
    border: 2px solid salmon;
  }
</style>

<div class="container">
  {#each product.ProductImages as _, idx}
    <img
      src={`https://enki.imgix.net/${product.Id}-${idx}`}
      alt={`${product.Id} image number ${idx + 1} of ${product.ProductImages.length}`} />
  {/each}
  <button>
    {`${product.Name} -- ${product.Id} -- ${product.SalePrice} -- ${product.CurrentStock} in stock`}
  </button>
  <AddToBasket productId={product.Id.toString()} />
  <button on:click={$goto('/payment/checkout')}>Goto Checkout</button>
</div>
