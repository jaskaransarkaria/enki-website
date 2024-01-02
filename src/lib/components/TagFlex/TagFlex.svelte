<script lang="ts">
  import { fade } from "svelte/transition";

  import type { BaseFn } from "$lib/types/base";
  import type { Tag } from "$lib/types/tag";

  export let data: Tag[] = [];
</script>

<div class="tag-flex">
  {#each data as tag (tag.Id)}
    <a
      data-sveltekit-preload-data
      class="hex-link"
      href={`/shop/tag/${tag.Name.toLowerCase()}?catid=0&tagid=${tag.Id}`}
    >
      <img
        src="/featured_1.png"
        alt="shape for the tag button"
        in:fade={{ duration: 800 }}
      />
      <h3>
        {tag.Name.split("-").slice(1).join(" ")}
      </h3>
    </a>
  {/each}
</div>

<style>
  .tag-flex {
    margin: 0 auto;
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hex-link {
    position: relative;
    text-align: center;
    color: black;
    overflow: hidden;
    margin: 8px;
    width: 40%;
  }

  img {
    margin: 0 auto;
    width: 100%;
  }

  h3 {
    font-family: "Welcomehome5 Regular";
    font-size: 0.55em;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }

  .hex-link:hover,
  .hex-link:focus {
    cursor: pointer;
    transform: scale(1.015);
  }

  @media (min-width: 360px) {
    h3 {
      font-size: 0.8em;
    }
  }

  @media (min-width: 450px) {
    .hex-link {
      margin: 10px;
    }

    h3 {
      font-size: 1em;
    }
  }

  @media (min-width: 700px) {
    h3 {
      font-size: 1.2em;
    }
  }

  @media (min-width: 1600px) {
    .hex-link {
      margin: 20px;
    }

    h3 {
      font-size: 1.4em;
    }
  }

  @media (min-width: 1960px) {
    h3 {
      font-size: 1.6em;
    }
  }

  @media (min-width: 2400px) {
    .hex-link {
      width: 20%;
    }

    h3 {
      font-size: 1.8em;
    }
  }
</style>
