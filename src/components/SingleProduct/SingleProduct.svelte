<script lang="typescript">
  import { goto } from '@roxi/routify';
  import AddToBasket from '@/components/AddToBasket/AddToBasket.svelte';
  import ProductImage from '@/components/ProductImage/ProductImage.svelte';
  import ImageLoader from '@/components/Image/ImageLoader.svelte';

  import type { Product } from '@/types/product';
  import type { Category } from '@/types/category';

  export let variantCategory: Category | null = null;
  export let product: Product | null;
  export let showDetailedView = false;

  let productDescription: string;

  $: if (product) {
    productDescription =
      product?.ProductDetails?.DetailedDescription || product.Description;
  }
</script>

{#if variantCategory}
  <button class="simple-container" on:click={$goto(`./${variantCategory.Id}`)}>
    <div class="position-img">
      <ImageLoader
        src={`https://enki.imgix.net/${variantCategory.Id}?auto=format`}
        alt={`${variantCategory.Name}`}
      />
    </div>
    <h3 class="basic-header">{`${variantCategory.Name}`}</h3>
    <h3>Individually priced</h3>
  </button>
{/if}

{#if product}
  {#if showDetailedView}
    <div
      class="details-container"
      on:click={$goto(`/shop/product/${product.Id}`)}
    >
      <h2>{`${product.Name}`}</h2>
      {#if product.ProductImages}
        <ProductImage {product} />
      {/if}
      <div class="detailed-products-footer">
        <div class="product-details">
          <h4>{`£${product.SalePrice}`}</h4>
          <h4>
            {`${
              product.CurrentStock <= 0
                ? 'sold out'
                : product.CurrentStock + ' in stock'
            }`}
          </h4>
        </div>
        <AddToBasket {product} detailed={showDetailedView} />
      </div>
    </div>
    <div class="detailed-description">
      <h4>{`${productDescription}`}</h4>
    </div>
  {:else}
    <button
      class="simple-container"
      on:click={$goto(`/shop/product/${product.Id}`)}
    >
      <div class="position-img">
        <ImageLoader
          src={`https://enki.imgix.net/${product.Id}-0?auto=format`}
          alt={`${product.Name}`}
        />
      </div>
      <h3 class="basic-header">{`${product.Name}`}</h3>
      <h3>
        {`£${product.SalePrice}`}
      </h3>
    </button>
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
    height: 250px;
    width: 250px;
    justify-content: auto;
    justify-self: auto;
    text-align: center;
    cursor: auto;
  }

  .detailed-description {
    width: 250px;
    text-align: center;
  }

  .simple-container:hover {
    transform: scale(1.06);
    box-shadow: 0 3px 65px rgb(0 0 0 / 0.2);
  }

  .position-img {
    justify-self: center;
  }

  .detailed-products-footer {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    width: 70%;
  }

  .product-details {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .product-details > * {
    padding: 10px;
    margin: 0;
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

  h2,
  h3 {
    text-align: center;
  }

  h2,
  h3,
  h4 {
    font-family: 'Caviar Dreams';
  }

  @media (min-width: 360px) {
    .details-container {
      height: 300px;
      width: 300px;
    }

    .simple-container {
      height: 150px;
      width: 150px;
    }

    .detailed-description {
      width: 300px;
    }

    h3 {
      font-size: 0.6em;
    }
  }

  @media (min-width: 700px) {
    .simple-container {
      height: 300px;
      width: 300px;
    }

    .details-container {
      height: 650px;
      width: 650px;
    }

    .detailed-description {
      width: 650px;
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
      font-size: 1.2em;
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

    .detailed-description {
      width: 775px;
    }
    .detailed-products-footer {
      height: 250px;
      flex-direction: column;
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

    .detailed-description {
      width: 900px;
    }
  }

  @media (min-width: 1600px) {
    .simple-container {
      height: 340px;
      width: 340px;
    }
  }

  @media (min-width: 2000px) {
    .simple-container {
      height: 450px;
      width: 450px;
    }
  }
</style>
