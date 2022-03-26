<script lang="ts">
  import { onMount } from "svelte";

  export let src: string;
  export let alt: string;

  let loaded = false;
  let thisImage: HTMLElement;

  onMount(() => {
    thisImage.onload = () => {
      loaded = true;
    };
  });
</script>

<img {src} {alt} class:loaded bind:this={thisImage} />

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
