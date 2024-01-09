<script lang="ts">
  import { onMount } from "svelte";
  import comingSoon from "$lib/assets/coming_soon.png";

  export let src: string;
  export let alt: string;

  let loaded = false;
  let thisImage: HTMLImageElement;

  onMount(() => {
    thisImage.onload = () => {
      loaded = true;
    };
  });
</script>

<img
  {src}
  {alt}
  class:loaded
  bind:this={thisImage}
  on:error={() => {
    if (thisImage.src != comingSoon) {
      thisImage.src = comingSoon;
    }
  }}
/>

<style>
  img {
    max-height: 100%;
    max-width: 100%;
    align-self: center;
    opacity: 0;
    transition: opacity 300ms ease-out;
  }
  img.loaded {
    opacity: 1;
  }
</style>
