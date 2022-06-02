<script context="module">
  import { browser } from "$app/env";

  // ...but if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = browser;

  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { reset as resetBasketStore } from "$lib/stores/basket";

  onMount(() => {
    resetBasketStore();
  });
</script>

<h1>Thank you for your purchase</h1>
<div class="container">
  <img
    src="https://enki.imgix.net/thank_you_page?format=auto,compress&q=100"
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
