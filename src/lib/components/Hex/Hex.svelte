<script lang="ts">
  import { fade } from "svelte/transition";
  import type { BaseFn } from "$lib/types/base";
  import type { Category } from "$lib/types/category";
  import type { Tag } from "$lib/types/tag";

  const handleError = (idx: number) => {
    imgElemArr[idx].onerror = null;
    sourceElemArr[idx].srcset = imgElemArr[idx].src;
  };

  export let categoryFn: BaseFn;
  export let isEmpty = false;
  export let idx = 0;
  export let category: Category | Tag = {
    Name: "",
    Id: 0,
    ParentId: 0,
    Children: [],
    NominalCode: null,
  };
  export let sourceElemArr: HTMLSourceElement[] = [];
  export let imgElemArr: HTMLImageElement[] = [];
</script>

<div class="hex-in">
  {#if isEmpty}
    <div class="hex-link">
      <img
        in:fade={{ duration: 800 }}
        src="https://enki.imgix.net/empty_hex_3.png?auto=format,compress"
        alt="hexagon shape for the category button"
      />
    </div>
  {:else}
    <a sveltekit:prefetch class="hex-link" href={categoryFn(category)}>
      <picture in:fade={{ duration: 800 }}>
        <source
          srcset={`https://enki.imgix.net/${category.Id}?auto=format,compress`}
          type="image/jpg"
          bind:this={sourceElemArr[idx]}
          data-testid="hex-image"
        />
        <img
          src={`https://enki.imgix.net/faith.jpg?auto=format,compress`}
          alt="placeholder"
          data-testid="hex-image-fallback"
          bind:this={imgElemArr[idx]}
          on:error={() => handleError(idx)}
        />
      </picture>
      <img
        in:fade|local={{ duration: 800 }}
        src={`https://enki.imgix.net/hex_${Math.floor(
          Math.random() * (6 - 1 + 1) + 1
        )}.svg`}
        alt="hexagon shape for the category button"
      />
      <div class="category-name">
        <h3 data-testid="hex-category-name">
          {"TagTypeId" in category
            ? category.Name.split("-").pop()
            : category.Name}
        </h3>
      </div>
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
    height: 15%;
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
  picture,
  button,
  h3 {
    left: -100%;
    right: -100%;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    transform: rotate3d(0, 0, 0, 0deg);
    font-size: 0.6em;
    font-family: "Welcomehome3 Regular";
  }

  h3 {
    width: 95px;
    font-size: 0.55em;
    vertical-align: middle;
    height: auto;
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
      width: 170px;
      font-size: 0.7em;
    }
  }

  @media (min-width: 700px) {
    h3 {
      width: 225px;
      font-size: 1.1em;
    }
  }

  @media (min-width: 960px) {
    h3 {
      width: 250px;
      font-size: 1.1em;
    }
  }

  @media (min-width: 1600px) {
    h3 {
      width: 195px;
      font-size: 1.2em;
    }
  }

  @media (min-width: 1960px) {
    h3 {
      width: 200px;
      font-size: 1.2em;
    }
  }

  @media (min-width: 2400px) {
    h3 {
      width: 240px;
      font-size: 1.2em;
    }
  }
</style>