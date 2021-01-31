<script lang="ts">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import AddToBasket from '../AddToBasket/AddToBasket.svelte';
  import { retrieveStateFn } from '../../libs/requests';

  import type { GetFn } from '../../libs/requests';

  interface Product {
    Name: string;
    Id: string;
    SalePrice: string;
    ProductImages: string[];
  }

  export let categoryId: string;

  let productArr: readonly Product[] = [];

  const getProducts: GetFn<Product> = (
    url: string
  ): Promise<ReadonlyArray<Product>> => fetch(url).then((res) => res.json());

  const refreshProducts = async (id: string) => {
    const result = await retrieveStateFn(
      `${process.env.SERVER_URL}/products-by-category?id=${id}`,
      getProducts
    )()();
    productArr = result['_tag'] === 'Right' ? (result.right as Product[]) : [];
  };

  onMount(async () => await refreshProducts(categoryId));
  $: refreshProducts(categoryId);
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
