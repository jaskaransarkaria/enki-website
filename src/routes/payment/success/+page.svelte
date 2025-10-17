<script lang="ts">
  import { onMount } from "svelte";
  import { reset as resetBasketStore } from "$lib/stores/basket";
  import thankYouPng from "$lib/assets/thank_you_page.png";
  import thankYouAvif from "$lib/assets/thank_you_page.avif";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";

  onMount(() => {
    resetBasketStore();
  });
</script>

<svelte:head>
  <title>Enki - Payment</title>
</svelte:head>

<h1>Thank you for your purchase</h1>
<div class="container">
  <img
    src={$isAvifSupported ? thankYouAvif : thankYouPng}
    alt="thank you for you purchase, a lady carrying lots of colourful gifts"
  />
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  h1 {
    font-family: "Welcomehome5 Regular";
    text-align: center;
  }

  img {
    max-width: 100%;
  }
</style>
