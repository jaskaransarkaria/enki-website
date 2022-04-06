<script lang="ts">
  import ImageLoader from "$lib/components/Image/ImageLoader.svelte";
  import DetailedSingleProduct from "$lib/components/DetailedSingleProduct/DetailedSingleProduct.svelte";

  import type { Product } from "$lib/types/product";
  import type { Category } from "$lib/types/category";

  export let variantCategory: Category | null = null;
  export let product: Product | null;
  export let showDetailedView = false;

  let productDescription: string;

  $: if (product) {
    productDescription =
      product?.ProductDetails?.DetailedDescription || product.Description;
  }
  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:window bind:outerWidth />
{#if variantCategory}
  <a
    sveltekit:prefetch
    class="simple-container"
    href={`./${variantCategory.Id}`}
  >
    <div class="position-img">
      <ImageLoader
        src={`https://enki.imgix.net/${variantCategory.Id}?auto=format,compress`}
        alt={`${variantCategory.Name}`}
      />
    </div>
    <h3 class="basic-header">{`${variantCategory.Name}`}</h3>
    <h3>Individually priced</h3>
  </a>
{/if}

{#if product}
  {#if showDetailedView}
    <DetailedSingleProduct {product} {productDescription} {isMobile} />
  {:else}
    <a
      sveltekit:prefetch
      class="simple-container"
      href={`/shop/product/${product.Id}`}
    >
      {#if product.ProductImages?.length}
        <div class="position-img">
          <ImageLoader
            src={`https://enki.imgix.net/${product.Id}-0?auto=format,compress`}
            alt={`${product.Name}`}
          />
        </div>
      {/if}
      <h3 class="simple-prod-name">
        {`${product.Name}`}
      </h3>
      <h3 data-testid="sale-price">
        {`£${product.SalePrice}`}
      </h3>
    </a>
  {/if}
{/if}

<style>
  .simple-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
    box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
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

  .simple-container {
    justify-content: space-evenly;
  }

  .simple-container:hover {
    transform: scale(1.06);
    box-shadow: 0 3px 65px rgb(0 0 0 / 0.2);
  }

  .position-img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60%;
    width: 80%;
  }

  .simple-prod-name {
    margin-bottom: 0;
  }

  h3 {
    display: block;
    font-size: 0.7em;
    margin-top: 0;
  }

  h3 {
    text-align: center;
  }

  h3,
  a {
    font-family: "Caviar Dreams";
    color: black;
  }

  a:hover {
    text-decoration: none;
  }

  @media (min-width: 360px) {
    .simple-container {
      height: 150px;
      width: 150px;
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

    h3 {
      font-size: 1.2em;
    }
  }

  @media (min-width: 960px) {
    .simple-container {
      height: 450px;
      width: 450px;
    }
  }

  @media (min-width: 1280px) {
    .simple-container {
      height: 385px;
      width: 385px;
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
