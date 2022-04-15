<script lang="ts">
  import { Swipe, SwipeItem } from "svelte-swipe";
  import { fade } from "svelte/transition";

  import type { Product } from "$lib/types/product";

  export let product: Product;
  export let activeItem = 0;
  export let SwipeComp: any;

  let swipeHolderHeight = 0;

  const swipeConfig = {
    autoplay: false,
    delay: 600,
    showIndicators: false,
    transitionDuration: 500,
    defaultIndex: activeItem,
  };

  function heightChanged({ detail }) {
    swipeHolderHeight = detail.height;
  }
</script>

{#if product?.ProductImages.length > 1}
  <div
    in:fade={{ duration: 600, delay: 200 }}
    style="height: {swipeHolderHeight < 100
      ? '100vw'
      : swipeHolderHeight + 'px'}"
    class="swipe-holder"
  >
    <Swipe bind:active_item={activeItem} bind:this={SwipeComp} {...swipeConfig}>
      {#each product.ProductImages as _, idx ("main" + idx)}
        <SwipeItem
          allow_dynamic_height={true}
          active={activeItem == idx}
          on:swipe_item_height_change={heightChanged}
        >
          <section>
            <img
              src={`https://enki.imgix.net/${product.Id}-${idx}?q=100`}
              alt={`${product.Name} image ${idx + 1}`}
            />
          </section>
        </SwipeItem>
      {/each}
    </Swipe>
  </div>
{:else}
  <section>
    <img
      src={`https://enki.imgix.net/${product.Id}-0?q=100`}
      alt={`${product.Name} image 1`}
    />
  </section>
{/if}

<style>
  section {
    height: max-content;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .swipe-holder {
    width: 100%;
    cursor: grab;
  }

  @media (min-width: 960px) {
  }

  @media (min-width: 1280px) {
    section > img {
      max-width: 400px;
      max-height: 300px;
    }
  }

  @media (min-width: 1600px) {
    section > img {
      max-width: 450px;
      max-height: 300px;
    }
  }

  @media (min-width: 2000px) {
    section > img {
      max-width: 500px;
      max-height: 350px;
    }
  }
</style>
