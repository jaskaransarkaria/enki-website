<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { BaseFn } from '@/types/base';
  import type { Category } from '@/types/category';
  import type { Tag } from '@/types/tag';

  const handleError = (idx: number) => {
    imgElemArr[idx].onerror = null;
    sourceElemArr[idx].srcset = imgElemArr[idx].src;
  };

  const TEST_ENV = process.env.NODE_ENV === 'test';

  export let isEmpty = false;
  export let categoryFn: BaseFn = () => undefined;
  export let loadedElemArr: boolean[] = [];
  export let idx = 0;
  export let category: Category | Tag = {
    Name: '',
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
        in:fade={{ delay: 250, duration: 1400 }}
        src={`https://enki.imgix.net/hex_${Math.floor(
          Math.random() * (6 - 1 + 1) + 1
        )}.svg`}
        alt="hexagon shape for the category button"
      />
    </div>
  {:else}
    <div class={loadedElemArr[idx] ? 'hex-link' : 'hex-link hex-loading'}>
      <picture in:fade={{ duration: 800 }}>
        <source
          srcset={`https://enki.imgix.net/${category.Id}?auto=format,compress`}
          type="image/jpg"
          bind:this={sourceElemArr[idx]}
          data-testid="hex-image"
          on:load={() => (loadedElemArr[idx] = true)}
        />
        <img
          src={`https://enki.imgix.net/faith.jpg?auto=format,compress`}
          alt="placeholder"
          data-testid="hex-image-fallback"
          bind:this={imgElemArr[idx]}
          on:error={() => handleError(idx)}
          on:load={() => (loadedElemArr[idx] = true)}
        />
      </picture>
      {#if loadedElemArr[idx]}
        <img
          in:fade|local={{ delay: 200, duration: 800 }}
          src={`https://enki.imgix.net/hex_${Math.floor(
            Math.random() * (6 - 1 + 1) + 1
          )}.svg`}
          alt="hexagon shape for the category button"
        />
      {/if}
      <button
        data-testid="hex-button"
        on:click={/*istanbul ignore next */ () => categoryFn(category)}
      />
      <div class="category-name">
        {#if loadedElemArr[idx] || TEST_ENV}
          <h3 data-testid="hex-category-name">{category.Name}</h3>
        {/if}
      </div>
    </div>
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
    font-family: 'Welcomehome3 Regular';
  }

  button {
    width: 100%;
    padding: 5%;
    box-sizing: border-box;
    background-color: transparent;
    color: white;
    z-index: 1;
    transform: translate3d(0, -100%, 0);
    transform: 0.2s ease-out, opacity 0.3s ease-out;
  }

  h3 {
    width: 95px;
    font-size: 0.55em;
    vertical-align: middle;
    height: auto;
  }

  button::after {
    content: '';
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

  .hex-loading {
    background-color: rgba(238, 238, 238, 1);
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
