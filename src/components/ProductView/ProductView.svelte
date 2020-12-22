<script lang="ts">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import AddToBasket from '../AddToBasket/AddToBasket.svelte';

  export let categoryId: string;

  let productArr: object[] = [];

  onMount(async () => {
    // fetch all the products in a specific category
    const fetchProductsByCategoryId = async (id: string) => {
      const response = await fetch(
        `${process.env.SERVER_URL}/products-by-category?id=${id}`
      );
      const result = await response.json();
      return result;
    };
    productArr = await fetchProductsByCategoryId(categoryId);
  });
</script>

<style>
  .products-container {
    display: grid;
    grid-template-rows: 25% 25% 25% 25%;
    grid-template-columns: 1fr 1fr 1fr;
  }

  button {
    width: 22.5vw;
    height: 25px;
  }

  button,
  button:active {
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
  }
</style>

<div class="products-container">
  {#each productArr as product}
    <button>
      {`${product.Name} -- ${product.Id} -- ${product.SalePrice} -- ${product.ProductImages[0]}`}
    </button>
    <div>
      <AddToBasket productId={product.Id.toString()} />
      <button on:click={$goto('/payment/checkout')}> Goto Checkout </button>
    </div>
  {/each}
</div>
