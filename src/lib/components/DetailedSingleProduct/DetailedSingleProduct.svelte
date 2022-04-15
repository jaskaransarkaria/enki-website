<script lang="ts">
  import { goto } from "$app/navigation";
  import AddToBasket from "$lib/components/AddToBasket/AddToBasket.svelte";
  import ProductImage from "$lib/components/ProductImage/ProductImage.svelte";
  import Thumbnails from "$lib/components/Thumbnails/Thumbnails.svelte";

  import type { Product } from "$lib/types/product";

  export let product: Product;
  export let productDescription: string;
  export let isMobile: boolean;

  let SwipeComp: any = undefined;
  let activeItem = 0;

  $: outerHeight = 0;
  $: outerWidth = 0;
</script>

<svelte:window bind:outerHeight bind:outerWidth />
{#if isMobile}
  <div class="details-container">
    {#if product.ProductImages}
      <ProductImage {product} bind:activeItem bind:SwipeComp />
      <Thumbnails {product} bind:activeItem bind:SwipeComp />
    {/if}
    <div class="detailed-products-footer">
      <h4>{`${product.Name}`}</h4>
      <h4>{`£${product.SalePrice}`}</h4>
      <h4>
        {`${
          product.CurrentStock <= 0
            ? "sold out"
            : product.CurrentStock + " in stock"
        }`}
      </h4>
    </div>
    <h4 class="description">{`${productDescription}`}</h4>
    <AddToBasket {product} detailed />
  </div>
{:else}
  <div class="details-container">
    <Thumbnails {product} bind:activeItem bind:SwipeComp />
    {#if product.ProductImages?.length}
      <div class="desktop-img-container">
        <ProductImage {product} bind:activeItem bind:SwipeComp />
      </div>
    {/if}
    <div class="detailed-products-footer">
      <h2>{product.Name}</h2>
      <h4>{`£${product.SalePrice}`}</h4>
      <h4>
        {`${
          product.CurrentStock <= 0
            ? "sold out"
            : product.CurrentStock + " in stock"
        }`}
      </h4>
      <h4 class="description">{`${productDescription}`}</h4>
      <AddToBasket {product} detailed />
    </div>
  </div>
{/if}

<style>
  h2,
  h4 {
    font-family: "Caviar Dreams";
  }

  .description {
    font-weight: lighter;
  }

  .details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
    border-radius: 0.25em;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background: none;
    outline: none;
    border: none;
    justify-content: auto;
    justify-self: auto;
    text-align: center;
    cursor: auto;
  }

  .detailed-products-footer {
    display: flex;
    justify-content: space-between;
    width: 65%;
    margin: 0.6em;
  }

  .detailed-products-footer > * {
    display: inline;
  }

  @media (min-width: 360px) {
    .detailed-products-footer {
      margin: 0.8em;
    }
  }

  @media (min-width: 700px) {
    h2 {
      font-size: 2em;
      justify-self: start;
    }

    h4 {
      font-size: 1em;
    }

    .detailed-products-footer {
      width: 25%;
      justify-content: space-between;
      margin: auto;
    }
  }

  @media (min-width: 960px) {
    h2,
    h4 {
      text-align: start;
    }

    .details-container {
      flex-direction: row;
      width: 100%;
      align-items: flex-start;
      align-self: flex-start;
    }

    .desktop-img-container {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
      border-radius: 0.25em;
      margin: 4%;
      width: 30vw;
      height: 30vw;
    }

    .detailed-products-footer {
      flex-direction: column;
      align-items: flex-start;
      height: 100%;
      margin: 2em;
      margin-top: 4%;
    }

    h4 {
      font-size: 1.25em;
    }
  }
</style>
