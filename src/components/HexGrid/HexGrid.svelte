<script lang="typescript">
  import { fade } from 'svelte/transition';
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
</script>

<ul in:fade={{ delay: 300, duration: 900 }} class="root-categories-container">
  {#each data as category, idx (category.Id)}
    <li class="hex">
      <div class="hex-in">
        <div class="hex-link">
          <picture>
            <source
              transition:fade|local
              srcset={`https://enki.imgix.net/${category.Id}`}
              type="image/jpg"
              bind:this={sourceElemArr[idx]}
              data-testid="hex-image"
            />
            <img
              transition:fade|local
              src="/faith.jpg"
              alt="placeholder"
              data-testid="hex-image-fallback"
              bind:this={imgElemArr[idx]}
              on:error={() => handleError(idx)}
            />
          </picture>
          <img
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

  .hex {
    grid-column-end: span 2;
    position: relative;
    visibility: hidden; /* was initially hidden */
    outline: 1px solid transparent; /* fix for jagged edges in FF on hover transition -- color should be transparent*/
  }

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

  .hex button {
    width: 100%;
    padding: 5%;
    box-sizing: border-box;
    background-color: rgba(46, 49, 49, 0.7);
    font-weight: 300;
    -webkit-transform: 0.2s ease-out, opacity 0.3s ease-out;
    transform: 0.2s ease-out, opacity 0.3s ease-out;
  }

  .hex h3 {
    width: 125px;
    vertical-align: middle;
    height: auto;
  }

  .hex button {
    font-size: 1.5em;
    color: white;
    z-index: 1;
    transform: translate3d(0, -100%, 0);
  }
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
    .hex h3 {
      width: 150px;
    }
  }

  @media (min-width: 700px) {
    .hex h3 {
      width: 175px;
      font-size: 0.8em;
    }
  }

  @media (min-width: 960px) {
    .hex h3 {
      width: 185px;
      font-size: 0.85em;
    }
  }

  @media (min-width: 1600px) {
    .hex h3 {
      width: 195px;
      font-size: 0.9em;
    }
  }

  @media (min-width: 2000px) {
    .hex h3 {
      width: 200px;
      font-size: 1em;
    }
  }

  @media (min-width: 2400px) {
    .hex h3 {
      width: 205px;
      font-size: 1.2em;
    }
  }

  /*The media queries below are for ordering the hexagons, awkard */
  @media (min-width: 1201px) {
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
      padding-bottom: 11.2%;
      grid-gap: 5px;
    }
    .hex:nth-child(3n + 3) {
      /* first hexagon of even rows */
      grid-column-start: 2;
    }
  }
</style>
