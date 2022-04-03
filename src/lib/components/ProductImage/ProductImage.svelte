<script lang="ts">
  import { Swipe, SwipeItem } from "svelte-swipe";
  import { fade } from "svelte/transition";

  import type { Product } from "$lib/types/product";

  export let product: Product;
  export let activeItem = 0;
  export let SwipeComp: any;

  let swipeHolderHeight = 0

  const swipeConfig = {
    autoplay: false,
    delay: 600,
    showIndicators: false,
    transitionDuration: 500,
    defaultIndex: activeItem,
  };


  function heightChanged({detail}) {
    swipeHolderHeight = detail.height;
  }

  $: outerWidth = 0;
  $: outerHeight = 0;
</script>

<svelte:window bind:outerWidth bind:outerHeight />
<div style="height: {swipeHolderHeight}px" class="swipe-holder">
  {#if product}
    <Swipe bind:active_item={activeItem} bind:this={SwipeComp} {...swipeConfig}>
      {#each product.ProductImages as _, idx ("main" + idx)}
        <SwipeItem 
          allow_dynamic_height={true}
          active={activeItem == idx}
          on:swipe_item_height_change={heightChanged}>
            <img
              in:fade={{ duration: 600 }}
              src={`https://enki.imgix.net/${
                product.Id
              }-${idx}?q=100`}
              alt={`${product.Name} image ${idx + 1}`}
            />
        </SwipeItem>
      {/each}
    </Swipe>
  {/if}
</div>

<style>
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
  }

  @media (min-width: 1600px) {
  }

  @media (min-width: 2000px) {
  }
</style>
