<script lang="typescript">
  import { fade } from 'svelte/transition';
  import { calcShowGrid } from '@/libs/gridCalc';
  import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.svelte';

  import type { Base, BaseFn } from '@/types/base';

  export let data: Base[] = [];
  export let categoryFn: BaseFn;

  const createEmptyArray = (length: number) =>
    new Array(length).fill(undefined);

  let imgElemArr: HTMLImageElement[] = [...createEmptyArray(data.length)];
  let sourceElemArr: HTMLSourceElement[] = [...createEmptyArray(data.length)];

  const handleError = (idx: number) => {
    imgElemArr[idx].onerror = null;
    sourceElemArr[idx].srcset = imgElemArr[idx].src;
  };

  $: showGrid = calcShowGrid(window.innerWidth, data.length);
</script>

<ul class={showGrid ? 'root-categories-container' : 'flexbox-container'}>
  {#each data as category, idx (category.Id)}
    <li class={showGrid ? 'hex' : 'hex-flex'}>
      <div class="hex-in">
        <div class="hex-link">
          <picture in:fade={{ duration: 1000 }}>
            <source
              srcset={`https://enki.imgix.net/${category.Id}`}
              type="image/jpg"
              bind:this={sourceElemArr[idx]}
              data-testid="hex-image"
            />
            <img
              src="/faith.jpg"
              alt="placeholder"
              data-testid="hex-image-fallback"
              bind:this={imgElemArr[idx]}
              on:error={() => handleError(idx)}
            />
          </picture>
          <img
            in:fade|local={{ delay: 200, duration: 1200 }}
            src={`https://enki.imgix.net/hex_${Math.floor(
              Math.random() * (6 - 1 + 1) + 1
            )}.svg`}
            alt="hexagon shape for the category button"
            class="hexagon-shape"
          />
          <button
            data-testid="hex-button"
            on:click={/*istanbul ignore next */ () => categoryFn(category)}
          />
          <div class="category-name">
            <h3 data-testid="hex-category-name">{category.Name}</h3>
          </div>
        </div>
      </div>
    </li>
  {:else}
    <LoadingSpinner />
  {/each}
</ul>

<style>
  .root-categories-container {
    display: grid;
    grid-gap: 45px;
    grid-template-columns: repeat(10, 1fr);
    margin: 0 auto;
    overflow: hidden;
    list-style-type: none;
    padding: 4.5%;
    padding-bottom: 15%;
  }

  .flexbox-container {
    display: flex;
    margin: 0 auto;
    overflow: hidden;
    list-style-type: none;
    justify-content: center;
    padding: 0;
    padding-bottom: 15%;
  }

  .hex-flex {
    width: 40%;
    margin: 1%;
  }

  .category-name {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: 40%;
    width: 100%;
    height: 15%;
  }

  .hex-flex,
  .hex {
    grid-column-end: span 2;
    position: relative;
    visibility: hidden; /* was initially hidden */
    outline: 1px solid transparent; /* fix for jagged edges in FF on hover transition -- color should be transparent*/
  }

  .hex-flex::after,
  .hex::after {
    content: '';
    display: block;
    padding-bottom: 86.602%; /* =  100 / tan(60) * 1.5 */
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
    color: #fff;
    overflow: hidden;
    transform: skewY(-30deg) rotate3d(0, 0, 1, 60deg);
  }

  .hex-flex picture,
  .hex-flex img,
  .hex picture,
  .hex img,
  button,
  h3 {
    left: -100%;
    right: -100%;
    width: auto;
    height: 100%;
    margin: 0 auto;
    transform: rotate3d(0, 0, 0, 0deg);
    font-size: 0.6em;
  }

  .hex-flex button,
  .hex button {
    width: 100%;
    padding: 5%;
    box-sizing: border-box;
    background-color: rgba(46, 49, 49, 0.7);
    color: white;
    z-index: 1;
    transform: translate3d(0, -100%, 0);
    transform: 0.2s ease-out, opacity 0.3s ease-out;
  }

  .hex-flex h3,
  .hex h3 {
    width: 95px;
    font-size: 0.5em;
    vertical-align: middle;
    height: auto;
  }

  .hex-flex button::after,
  .hex button::after {
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

  @media (min-width: 360px) {
    .hex h3,
    .hex-flex h3 {
      width: 110px;
      font-size: 0.55em;
    }
  }

  @media (min-width: 700px) {
    .hex-flex h3,
    .hex h3 {
      width: 175px;
      font-size: 0.8em;
    }

    .flexbox-container {
      padding-bottom: 8%;
    }

    .hex-flex {
      width: 25%;
      margin: 1%;
    }
  }

  @media (min-width: 960px) {
    .hex-flex h3,
    .hex h3 {
      width: 185px;
      font-size: 0.85em;
    }

    .flexbox-container {
      padding-bottom: 5%;
    }

    .hex-flex {
      width: 18%;
      margin: 1%;
    }
  }

  @media (min-width: 1600px) {
    .hex-flex h3,
    .hex h3 {
      width: 195px;
      font-size: 0.9em;
    }

    .hex-flex {
      width: 15%;
      margin: 1%;
    }
  }

  @media (min-width: 1960px) {
    .root-categories-container {
      grid-template-columns: repeat(14, 1fr);
      grid-gap: 10px;
    }

    /* <- 7-6  hexagons per row */
    .hex:nth-child(13n + 8) {
      /* first hexagon of even rows */
      grid-column-start: 2;
    }

    .hex-flex h3,
    .hex h3 {
      width: 200px;
      font-size: 1em;
    }

    .hex-flex {
      width: 10%;
      margin: 1%;
    }
  }

  @media (min-width: 2400px) {
    .hex-flex h3,
    .hex h3 {
      width: 205px;
      font-size: 1.2em;
    }

    .hex-flex {
      width: 10%;
      margin: 1%;
    }
  }

  /*The media queries below are for ordering the hexagons, awkard */
  @media (min-width: 1201px) and (max-width: 1959px) {
    .root-categories-container {
      grid-gap: 10px;
    }
    /* <- 5-4  hexagons per row */
    .hex:nth-child(9n + 6) {
      /* first hexagon of even rows */
      grid-column-start: 2;
    }
  }

  @media (max-width: 1200px) and (min-width: 901px) {
    /* <- 4-3  hexagons per row */
    .root-categories-container {
      grid-template-columns: repeat(8, 1fr);
      grid-gap: 15px;
      padding-bottom: 5.5%;
    }
    .hex:nth-child(7n + 5) {
      /* first hexagon of even rows */
      grid-column-start: 2;
    }
  }

  @media (max-width: 900px) and (min-width: 601px) {
    /* <- 3-2  hexagons per row */
    .root-categories-container {
      grid-template-columns: repeat(6, 1fr);
      padding-bottom: 7.4%;
      grid-gap: 20px;
    }
    .hex:nth-child(5n + 4) {
      /* first hexagon of even rows */
      grid-column-start: 2;
    }
  }

  @media (max-width: 600px) {
    /* <- 2-1  hexagons per row */
    .root-categories-container {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 5px;
    }

    .hex:nth-child(3n + 3) {
      /* first hexagon of even rows */
      grid-column-start: 2;
    }
  }
</style>
