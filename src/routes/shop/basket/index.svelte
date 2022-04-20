<script context="module">
  import Basket from "$lib/components/Basket/Basket.svelte";
  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<svelte:head>
  <title>Enki - Basket</title>
</svelte:head>
<Basket />
