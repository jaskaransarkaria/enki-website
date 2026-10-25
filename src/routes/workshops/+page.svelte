<script lang="ts">
  import PrivateParties from "#lib/components/Svg/PrivateParties.svelte";
  import WeddingRings from "#lib/components/Svg/WeddingRingsCharlotte.svelte";
  import ScheduledClasses from "#lib/components/Svg/ScheduledClasses.svelte";
</script>

<svelte:head>
  <title>Jewellery &amp; Craft Workshops in Birmingham | Enki</title>
  <meta
    name="description"
    content="Wedding ring classes, jewellery making workshops, craft classes and private parties above our shop on Kings Heath High Street, Birmingham."
  />
  <meta
    property="og:title"
    content="Jewellery &amp; Craft Workshops in Birmingham | Enki"
  />
  <meta
    property="og:description"
    content="Wedding ring classes, jewellery making workshops, craft classes and private parties above our shop on Kings Heath High Street, Birmingham."
  />
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
