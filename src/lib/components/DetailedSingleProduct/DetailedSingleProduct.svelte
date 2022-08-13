<script lang="ts">
  import { clickOutside } from "$lib/utils/clickOutside";
  import AddToBasket from "$lib/components/AddToBasket/AddToBasket.svelte";
  import MobileClose from "$lib/components/MobileClose/MobileClose.svelte";
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";

  import type { Product } from "$lib/types/product";

  export let product: Product;
  export let productDescription: string;
  export let isMobile: boolean;

  const treatedProductDescription = productDescription
    .split(/\n|\r\n/g)
    .map((v: string) => ({ text: v }));

  const handleWindowKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      showFullScreen = false;
      visible = 0;
    }
  };

  const createImgArr = (
    product: Product,
    imgWidth?: number
  ): { src: string; alt: string }[] =>
    product.ProductImages.length
      ? product.ProductImages.map((_, idx) => ({
          src: `https://enki.imgix.net/${product.Id}-${idx}?q=100${
            imgWidth ? `&w=${imgWidth}` : ""
          }`,
          alt: `${product.Name} image ${idx + 1}`,
        }))
      : [
          {
            src: `https://enki.imgix.net/${product.Id}-0?q=100${
              imgWidth ? `&w=${imgWidth}` : ""
            }`,
            alt: `${product.Name} image 1`,
          },
        ];

  let showFullScreen = false;
  let clientWidth: number = 0;
  let visible = 0;

  $: outerHeight = 0;
  $: outerWidth = 0;
  $: innerWidth = 0;
</script>

<svelte:window
  bind:outerHeight
  bind:outerWidth
  bind:innerWidth
  on:keydown={handleWindowKeyDown}
  on:click={() => {
    if (showFullScreen) {
      visible += 1;
    }
  }}
/>
{#if isMobile}
  <div class="details-container">
    {#if product.ProductImages}
      <div
        class="mobile-img-container"
        style:width={clientWidth ? clientWidth + "px" : "90vw"}
        on:click={() => {
          showFullScreen = true;
          visible += 1;
          window.scrollTo(0, 0);
        }}
      >
        <SwipeImage imgArr={createImgArr(product)} />
      </div>
    {/if}
    <div class="detailed-products-footer">
      <h4 class="mobile-prod-name">{`${product.Name}`}</h4>
      <h4>{`£${product.SalePrice.toFixed(2)}`}</h4>
      <div class="mobile-details">
        {#if product.CurrentStock > 0}
          <AddToBasket {product} detailed />
        {/if}
        <h4>
          {`${
            product.CurrentStock <= 0
              ? "sold out"
              : product.CurrentStock + " in stock"
          }`}
        </h4>
      </div>
    </div>
    {#each treatedProductDescription as { text }}
      <h4 class="description">{text}</h4>
    {/each}
  </div>
{:else}
  <div class="details-container">
    <div class="desktop-left-container">
      <div
        class="desktop-img-container"
        on:click={() => {
          showFullScreen = true;
          visible += 1;
          window.scrollTo(0, 0);
        }}
      >
        <SwipeImage imgArr={createImgArr(product)} />
      </div>
    </div>
    <div class="detailed-products-footer">
      <h2>{product.Name}</h2>
      <h4>{`£${product.SalePrice.toFixed(2)}`}</h4>
      {#each treatedProductDescription as { text }}
        <h4 class="description">{text}</h4>
      {/each}
      <h5>
        {`${
          product.CurrentStock <= 0
            ? "sold out"
            : product.CurrentStock + " in stock"
        }`}
      </h5>
      {#if product.CurrentStock > 0}
        <AddToBasket {product} detailed />
      {/if}
    </div>
  </div>
{/if}
{#if showFullScreen}
  <div class="full-screen">
    <div
      class="img-view"
      use:clickOutside={{
        enabled: showFullScreen && visible > 1,
        cb: () => {
          showFullScreen = false;
          visible = 0;
        },
      }}
    >
      {#if isMobile}
        <MobileClose
          cb={() => {
            showFullScreen = false;
            visible = 0;
          }}
          bind:bool={showFullScreen}
          positionOverride="top: 1%; left: 2%"
        />
        <SwipeImage
          imgArr={createImgArr(product, innerWidth * (100 / 100))}
          setImgWidth
        />
      {:else}
        <div class="full-screen-img-view">
          <SwipeImage
            imgArr={createImgArr(product, innerWidth * (35 / 100))}
            setImgWidth
            fullScreen
          />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  h2,
  h4,
  h5 {
    font-family: "Caviar Dreams";
  }

  .description {
    margin-bottom: 0;
    font-weight: lighter;
    margin-top: 0em;
  }

  .details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
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

  .img-view {
    position: relative;
    display: flex;
    background: white;
    justify-content: center;
    box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
    border-radius: 0.25em;
    margin: 4%;
    height: 100%;
    width: 100%;
    top: 50%;
    align-items: center;
    transform: translateY(-50%);
  }

  .full-screen {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    z-index: 101;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(2.5px);
  }

  .full-screen-img-view {
    display: flex;
    width: 65%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .detailed-products-footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    margin: 0.6em;
  }

  .detailed-products-footer > * {
    display: inline;
  }

  .mobile-img-container {
    display: flex;
    justify-content: center;
  }

  .mobile-details {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  .mobile-prod-name {
    margin-top: 1em;
    margin-bottom: 0;
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
      width: 50%;
      justify-content: space-between;
      margin: auto;
    }

    .mobile-prod-name {
      margin-top: 2em;
    }
  }

  @media (min-width: 960px) {
    h4 {
      font-size: 1.25em;
    }
  }

  @media (min-width: 1280px) {
    h2,
    h4,
    h5 {
      text-align: start;
    }

    h5 {
      font-size: 1em;
    }

    h2 {
      margin-bottom: 0em;
    }

    .details-container {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      align-self: flex-start;
    }

    .desktop-left-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 4%;
    }

    .desktop-img-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
      border-radius: 0.25em;
      margin: 4%;
      width: 30vw;
      height: 30vw;
    }

    .detailed-products-footer {
      width: 30%;
      flex-direction: column;
      height: 100%;
      margin: 2em;
      margin-top: 4%;
    }

    .full-screen {
      position: absolute;
    }

    .img-view {
      width: 65vw;
      height: 40vw;
      top: 40%;
    }
  }

  @media (min-width: 1600px) {
    .details-container {
      align-items: flex-start;
      justify-content: center;
    }
  }
</style>
