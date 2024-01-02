<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import { fade } from "svelte/transition";
  import { lazy } from "$lib/utils/lazyAction";

  import type { Category } from "$lib/types/category";
  import type { Tag } from "$lib/types/tag";

  export let hexHref = "";
  export let isEmpty = false;
  export let category: Category | Tag = {
    Name: "",
    Id: 0,
    ParentId: 0,
    Children: [],
    NominalCode: null,
    Description: "",
  };
  export let loaded: Map<string, HTMLImageElement> = new Map();
</script>

<div class="hex-in">
  {#if isEmpty}
    <div class="hex-link">
      <img
        src={`${PUBLIC_BUCKET_URL}/empty_hex_4.png`}
        alt="hexagon shape for the category button"
        data-testid="empty-hex"
      />
    </div>
  {:else}
    <a
      data-testid="hex-link"
      data-sveltekit-preload-data
      class="hex-link"
      href={hexHref}
    >
      {#key loaded}
        <img
          in:fade={{ duration: 700, delay: 200 }}
          src="/grey_square.png"
          use:lazy={{
            src: `${PUBLIC_BUCKET_URL}/${category.Description}`,
            loaded,
          }}
          alt={`category ${category.Name}`}
          data-testid="cdn-img"
        />
        <img
          in:fade={{ duration: 500 }}
          src={`${PUBLIC_BUCKET_URL}/hex_${Math.floor(
            Math.random() * (6 - 1 + 1) + 1
          )}.svg`}
          alt="hexagon shape for the category button"
        />
        <div class="category-name">
          <h3 data-testid="hex-category-name" in:fade={{ duration: 500 }}>
            {"TagTypeId" in category
              ? category.Name.split("-").slice(1).join(" ") // remove the first element and join the others by " "
              : category.Name}
          </h3>
        </div>
      {/key}
    </a>
  {/if}
</div>

<style>
  .category-name {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: 40%;
    width: 100%;
    height: 18%;
  }

  .hex-in {
    position: absolute;
    width: 100%;
    padding-bottom: 115.47%; /* =  width / sin(60) */
    overflow: hidden;
    visibility: hidden;
    outline: 1px solid transparent; /* fix for jagged edges in FF on hover transition */
    transform: rotate3d(0, 0, 1, -60deg) skewY(30deg);
  }

  .hex-in * {
    position: absolute;
    visibility: visible;
    outline: 1px solid transparent; /* fix for jagged edges in FF on hover transition */
  }

  .hex-link {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    color: black;
    overflow: hidden;
    transform: skewY(-30deg) rotate3d(0, 0, 1, 60deg);
  }

  img,
  button {
    left: -100%;
    right: -100%;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    transform: rotate3d(0, 0, 0, 0deg);
    font-size: 0.6em;
    font-family: "Welcomehome5 Regular";
  }

  h3 {
    position: absolute;
    width: 95%;
    height: auto;
    margin-top: 0px;
    margin-bottom: 0px;
    font-family: "Welcomehome5 Regular";
    font-size: 0.55em;
  }

  button::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 45%;
    width: 10%;
    text-align: center;
    border-bottom: 1px solid #fff;
  }

  .hex-link:hover button,
  .hex-link:focus button {
    cursor: pointer;
    transform: translate3d(0, 0, 0);
  }

  @media (min-width: 360px) {
    h3 {
      font-size: 0.7em;
    }
  }

  @media (min-width: 700px) {
    h3 {
      font-size: 0.8em;
    }
  }

  @media (min-width: 1600px) {
    h3 {
      font-size: 1.1em;
    }
  }

  @media (min-width: 1960px) {
    h3 {
      font-size: 0.9em;
    }
  }

  @media (min-width: 2400px) {
    h3 {
      font-size: 1em;
    }
  }
</style>
