<script lang="typescript">
  export let src: string;
  export let alt: string;

  import { onMount } from 'svelte';

  let loaded = false;
  let thisImage: HTMLElement;

  onMount(() => {
    thisImage.onload = () => {
      loaded = true;
    };
  });
</script>

<div class="img-container">
  <img {src} {alt} class:loaded bind:this={thisImage} loading="lazy" />
</div>

<style>
  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 140px;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    opacity: 0;
    transition: opacity 1300ms ease-out;
  }
  img.loaded {
    opacity: 1;
  }

  @media (min-width: 360px) {
    .img-container {
      height: 190px;
    }
  }

  @media (min-width: 700px) {
    .img-container {
      height: 350px;
    }
  }

  @media (min-width: 960px) {
    .img-container {
      height: 250px;
    }
  }

  @media (min-width: 1280px) {
    .img-container {
      height: 180px;
    }
  }

  @media (min-width: 1600px) {
    .img-container {
      height: 180px;
    }
  }

  @media (min-width: 2000px) {
    .img-container {
      height: 225px;
    }
  }
</style>
