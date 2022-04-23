<script context="module">
  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script lang="ts">
  import { fade } from "svelte/transition";

  $: groupHover = false;
  $: weddingHover = false;
</script>

<div class="container">
  <div class="class-pics">
    <a sveltekit:prefetch href="/classes/beginners">
      <button class="class-button">
        <img
          in:fade={{ duration: 600 }}
          src={groupHover ? "/group_portrait.gif" : "/group_classes.png"}
          alt="cartoon button with a hammer"
          on:mouseenter={() => (groupHover = true)}
          on:mouseleave={() => (groupHover = false)}
        />
      </button>
    </a>
    <a sveltekit:prefetch href="/classes/wedding-rings">
      <button class="class-button">
        <img
          in:fade={{ duration: 600 }}
          src={weddingHover ? "/wedding.gif" : "/wedding_ring_classes.png"}
          alt="cartoon button with a boquet of flowers"
          on:mouseenter={() => (weddingHover = true)}
          on:mouseleave={() => (weddingHover = false)}
        />
      </button>
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
  }

  .class-button:hover {
    cursor: pointer;
  }

  .class-button > img {
    width: 80%;
    padding: 5px;
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
