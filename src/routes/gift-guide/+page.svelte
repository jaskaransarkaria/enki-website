<script lang="ts">
  import TagView from "$lib/components/TagView/TagView.svelte";
</script>

<h1 class="featured">Gift guide</h1>
<TagView prefix="FEATURED" showHex={false} />

<style>
  .featured {
    background-color: white;
    text-align: center;
    font-family: "Welcomehome5 Regular";
    width: 100vw;
  }

  @media (min-width: 1200px) {
    .featured {
      margin-top: 4%;
      margin-bottom: 4%;
      font-size: 2.5em;
    }
  }

  @media (min-width: 2400px) {
    .featured {
      margin-top: 4%;
      margin-bottom: 4%;
      font-size: 3em;
    }
  }
</style>
