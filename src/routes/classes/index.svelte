<script context="module">
  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script lang="ts">
  import { fade } from "svelte/transition";
  import GroupClass from "$lib/components/Svg/GroupClass.svelte";
  import WeddingRings from "$lib/components/Svg/WeddingRings.svelte";

  $: weddingHover = false;
</script>

<div class="container">
  <div class="class-pics">
    <a class="class-button" sveltekit:prefetch href="/classes/beginners">
      <GroupClass />
    </a>
    <a class="class-button" sveltekit:prefetch href="/classes/wedding-rings">
      <WeddingRings />
    </a>
    <div />
  </div>
</div>

<style>
  .container {
    display: flex;
    min-height: 100%;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 5%;
  }

  .class-pics {
    display: flex;
    flex-direction: column;
    margin-bottom: 10%;
  }

  .class-button {
    border: none;
    background: none;
    width: 45%;
  }

  .class-button:hover {
    cursor: pointer;
  }

  .class-button > img {
    width: 80%;
    padding: 5px;
    font-family: "Welcomehome3 Regular";
  }

  @media (min-width: 960px) {
    .class-pics {
      flex-direction: row;
      margin-bottom: 2%;
    }
  }

  @media (min-width: 2200px) {
    .class-pics {
      width: 50%;
      justify-content: space-evenly;
    }
    .class-button > img {
      width: 100%;
      padding: 5px;
      margin: 10px;
    }
  }
</style>
