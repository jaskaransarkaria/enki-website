<script context="module">
  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script lang="ts">
  import GroupClass from "$lib/components/Svg/GroupClass.svelte";
  import WeddingRings from "$lib/components/Svg/WeddingRings.svelte";
</script>

<div class="container">
  <GroupClass />
  <WeddingRings />
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    min-height: 100vh;
  }
</style>
