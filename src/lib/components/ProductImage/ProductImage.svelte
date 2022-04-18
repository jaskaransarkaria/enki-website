<script lang="ts">
  import { afterUpdate } from "svelte";

  import { Swipe, SwipeItem } from "svelte-swipe";
  import { fade } from "svelte/transition";

  import type { Product } from "$lib/types/product";

  export let product: Product;
  export let activeItem = 0;
  export let SwipeComp: any;
  export let detailedImgArr: HTMLImageElement[] = [];
  export let clientWidth;
  export let setImgWidth = "";

  let swipeHolderHeight = 0;

  const swipeConfig = {
    autoplay: false,
    delay: 600,
    showIndicators: false,
    transitionDuration: 500,
    defaultIndex: activeItem,
  };

  const heightChanged = ({ detail }) => {
    swipeHolderHeight = detail.height;
  };

  afterUpdate(() => {
    clientWidth = detailedImgArr[activeItem]?.clientWidth;
  });
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
              class={setImgWidth ? "full-screen-view" : ""}
              src={`https://enki.imgix.net/${product.Id}-${idx}?q=100${setImgWidth}`}
              alt={`${product.Name} image ${idx + 1}`}
              bind:this={detailedImgArr[idx]}
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
      bind:this={detailedImgArr[0]}
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

  .full-screen-view {
    max-width: 30vw;
    max-height: 30vw;
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
      max-width: 600px;
      max-height: 550px;
    }
  }
</style>
