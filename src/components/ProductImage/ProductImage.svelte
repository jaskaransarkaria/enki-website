<script lang="typescript">
  import { Swipe, SwipeItem } from 'svelte-swipe';

  import type { Product } from '@/types/product';

  export let product: Product;

  let activeItem = 0; //readonly
  let SwipeComp: any;
  let size = {
    width: 200,
    height: 135,
  };

  const setSize = (screenWidth: number) => {
    if (screenWidth < 360) {
      size.height = 125;
      size.width = 130;
    }

    if (screenWidth >= 360 && screenWidth < 700) {
      size.height = 160;
      size.width = 400;
      return;
    }
    if (screenWidth >= 700 && screenWidth < 900) {
      size.height = 300;
      size.width = 600;
      return;
    }
    if (screenWidth >= 900 && screenWidth < 1280) {
      size.height = 400;
      size.width = 700;
      return;
    }
    if (screenWidth >= 1280 && screenWidth < 1600) {
      size.height = 500;
      size.width = 850;
      return;
    }
    if (screenWidth >= 1600 && screenWidth < 2000) {
      size.height = 500;
      size.width = 850;
      return;
    }
    if (screenWidth >= 2000) {
      size.height = 500;
      size.width = 850;
      return;
    }
  };

  const swipeConfig = {
    autoplay: false,
    delay: 2000,
    showIndicators: false,
    transitionDuration: 1000,
    defaultIndex: 0,
  };

  const changeSlide = (i: number) => {
    SwipeComp.goTo(i);
  };

  const handleArrowKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && activeItem !== 0) {
      activeItem -= 1;
      SwipeComp.goTo(activeItem);
    }
    if (
      event.key === 'ArrowRight' &&
      activeItem + 1 !== product.ProductImages.length
    ) {
      activeItem += 1;
      SwipeComp.goTo(activeItem);
    }
  };

  $: outerWidth = 0;
  $: setSize(outerWidth);
</script>

<svelte:window on:keydown={handleArrowKeydown} bind:outerWidth />
{#if product}
  <div class="swipe-holder">
    <Swipe bind:active_item={activeItem} bind:this={SwipeComp} {...swipeConfig}>
      {#each product.ProductImages as _, idx ('main' + idx)}
        <SwipeItem allow_dynamic_height={true}>
          <img
            class="img-fluid"
            src={`https://enki.imgix.net/${product.Id}-${idx}?fit=max&w=${size.width}&h=${size.height}&q=100`}
            alt={`${product.Name} image ${idx + 1}`}
          />
        </SwipeItem>
      {/each}
    </Swipe>
  </div>
  <div class="card-body">
    <div class="is-center">
      {#each product.ProductImages as _, idx ('thumb' + idx)}
        <img
          class="img-fluid {activeItem === idx
            ? 'rounded'
            : 'img-thumbnail'} thumbnails"
          on:click={() => changeSlide(idx)}
          src={`https://enki.imgix.net/${product.Id}-${idx}?auto=format,compress&q=10`}
          alt={`${product.Name} thumbnail ${idx + 1}`}
        />
      {/each}
    </div>
  </div>
{/if}

<style>
  .swipe-holder {
    height: 35vh;
    width: 100%;
    cursor: grab;
  }

  .is-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .thumbnails {
    margin: 5%;
    cursor: pointer;
    height: 35px;
    width: 35px;
  }

  .rounded {
    border-radius: 0.25em;
    transform: scale(1.15);
    border: 2px solid lightgray;
  }

  @media (min-width: 360px) {
  }

  @media (min-width: 700px) {
    .swipe-holder {
      height: 30vh;
    }
  }

  @media (min-width: 960px) {
    .swipe-holder {
      height: 70vh;
    }
  }

  @media (min-width: 1280px) {
  }

  @media (min-width: 1600px) {
  }

  @media (min-width: 2000px) {
  }
</style>
