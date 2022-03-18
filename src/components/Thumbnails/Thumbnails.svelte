<script lang="typescript">
  import type { Product } from '@/types/product';

  export let product: Product;
  export let activeItem = 0; //readonly
  export let SwipeComp: any;

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
</script>

<svelte:window on:keydown={handleArrowKeydown} bind:outerWidth />
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

<style>
  .is-center {
    margin-top: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
  }

  .img-view {
    position: relative;
    height: 50%;
    top: 50%;
    transform: translateY(-50%);
  }

  .img-fluid-full-screen {
    position: relative;
    max-width: 100%;
    max-height: 100%;
  }

  .full-screen {
    position: absolute;
    z-index: 101;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(2.5px);
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

  @media (min-width: 960px) {
    .thumbnails {
      height: 45px;
      width: 45px;
    }
  }

  @media (min-width: 1280px) {
  }

  @media (min-width: 1600px) {
  }

  @media (min-width: 2000px) {
    .thumbnails {
      height: 50px;
      width: 50px;
    }
  }
</style>
