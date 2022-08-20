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
