<script context="module">
  import { browser } from "$app/env";

  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script lang="ts">
  import Basket from "$lib/components/Basket/Basket.svelte";
</script>

<Basket />
