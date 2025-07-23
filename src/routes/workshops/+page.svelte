<script lang="ts">
  import PrivateParties from "$lib/components/Svg/PrivateParties.svelte";
  import WeddingRings from "$lib/components/Svg/WeddingRingsCharlotte.svelte";
  import ScheduledClasses from "$lib/components/Svg/ScheduledClasses.svelte";
</script>

<svelte:head>
  <title>{"Enki - Classes"}</title>
</svelte:head>

<div class="container">
  <ScheduledClasses />
  <WeddingRings />
  <PrivateParties />
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
