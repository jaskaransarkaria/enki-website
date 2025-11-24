<script lang="ts">
  import { onMount } from "svelte";
  import comingSoon from "$lib/assets/coming_soon.png";

  interface Props {
    src: string;
    alt: string;
  }

  let { src, alt }: Props = $props();

  let loaded = $state(false);
  let thisImage: HTMLImageElement = $state();

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
  onerror={() => {
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
