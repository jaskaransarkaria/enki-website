<script lang="typescript">
  import { goto } from '@roxi/routify';
  import AddToBasket from '@/components/AddToBasket/AddToBasket.svelte';
  import ProductImage from '@/components/ProductImage/ProductImage.svelte';

  import type { Product } from '@/types/product';

  export let product: Product;
  export let showDetailedView = false;
</script>

{#if product}
  <button
    class={showDetailedView ? 'details-container' : 'simple-container'}
    on:click={$goto(`/shop/product/${product.Id}`)}
  >
    {#if showDetailedView}
      <h2>{`${product.Name}`}</h2>
      {#if product.ProductImages}
        <ProductImage {product} />
      {/if}
      <div class="detailed-products-footer">
        <div class="product-details">
          <h4>
            {`£${product.SalePrice} -- ${
              product.CurrentStock === 0
                ? 'sold out'
                : product.CurrentStock + ' in stock'
            }`}
          </h4>
        </div>
        <AddToBasket {product} detailed={showDetailedView} />
      </div>
    {:else}
      <h3 class="basic-header">{`${product.Name}`}</h3>
      <figure class="img-container">
        <img
          src={`https://enki.imgix.net/${product.Id}-0`}
          alt={`${product.Name}`}
        />
      </figure>
      <h3 class="basic-header">
        {`£${product.SalePrice} -- ${
          product.CurrentStock >= 0
            ? 'sold out'
            : product.CurrentStock + ' in stock'
        }`}
      </h3>
      <AddToBasket {product} detailed={showDetailedView} />
    {/if}
  </button>

  {#if showDetailedView}
    <h4>{`${product.Description}`}</h4>
  {/if}
{/if}

<style>
  .simple-container,
  .details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 0.25em;
    margin: 4%;
    height: 250px;
    width: 250px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background: none;
    outline: none;
    border: none;
  }

  .details-container {
    height: 300px;
    width: 300px;
    justify-content: auto;
    justify-self: auto;
  }

  .simple-container:hover {
    transform: scale(1.06);
    box-shadow: 0 3px 65px rgb(0 0 0 / 0.2);
  }

  .img-container {
    display: flex;
    height: 100px;
  }

  .img-container img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }

  .detailed-products-footer {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: space-between;
  }

  .product-details {
    display: flex;
  }

  h2 {
    font-size: 0.8em;
  }

  h4 {
    font-size: 0.7em;
  }

  h3 {
    display: block;
    font-size: 0.7em;
  }

  h1,
  h2,
  h3 {
    text-align: center;
  }

  @media (min-width: 360px) {
    .simple-container,
    .details-container {
      height: 300px;
      width: 300px;
    }

    .img-container {
      height: 125px;
    }

    h3 {
      font-size: 0.8;
    }
  }

  @media (min-width: 700px) {
    .simple-container {
      height: 550px;
      width: 550px;
    }

    .details-container {
      height: 650px;
      width: 650px;
    }

    .img-container {
      height: 250px;
    }

    h2 {
      font-size: 2em;
      justify-self: start;
    }

    h4 {
      font-size: 1em;
    }

    .product-details {
      display: block;
    }

    .detailed-products-footer {
      width: 100%;
      height: 110px;
      padding: 1.5%;
      flex-wrap: wrap;
      justify-content: space-between;
      justify-content: center;
    }

    h3 {
      font-size: 1.4em;
    }
  }

  @media (min-width: 960px) {
    .simple-container {
      height: 450px;
      width: 450px;
    }

    .details-container {
      height: 775px;
      width: 775px;
    }

    .detailed-products-footer {
      height: 250px;
    }

    .img-container {
      height: 200px;
    }

    h4 {
      font-size: 1.25em;
    }
  }

  @media (min-width: 1280px) {
    .simple-container {
      height: 385px;
      width: 385px;
    }

    .details-container {
      width: 900px;
      height: 900px;
    }

    .img-container {
      height: 150px;
    }
  }
  @media (min-width: 1600px) {
    .simple-container {
      height: 385px;
      width: 385px;
    }

    .img-container {
      height: 150px;
    }
  }

  @media (min-width: 2000px) {
    .simple-container {
      height: 450px;
      width: 450px;
    }

    .img-container {
      height: 200px;
    }
  }
</style>
