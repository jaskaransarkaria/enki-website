<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import { onMount } from "svelte";
  import { reset as resetBasketStore } from "$lib/stores/basket";

  onMount(() => {
    resetBasketStore();
  });
</script>

<svelte:head>
  <title>{"Enki - Payment"}</title>
</svelte:head>

<h1>Thank you for your purchase</h1>
<div class="container">
  <img
    src={`${PUBLIC_BUCKET_URL}/thank_you_page`}
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
