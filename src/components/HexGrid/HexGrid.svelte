<script lang="typescript">
  import { fly, fade } from 'svelte/transition';
  import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.svelte';

  import type { Base, BaseFn } from '@/types/base';

  export let data: Base[] = [];
  export let categoryFn: BaseFn;

  const createEmptyArray = () => new Array(data.length).fill(undefined);

  let imgElemArr: HTMLImageElement[] = [...createEmptyArray()];
  let sourceElemArr: HTMLSourceElement[] = [...createEmptyArray()];

  const handleError = (idx: number) => {
    imgElemArr[idx].onerror = null;
    sourceElemArr[idx].srcset = imgElemArr[idx].src;
  };
</script>

<ul in:fade class="root-categories-container">
  {#each data as category, idx}
    <li
      out:fly={{
        x: (idx + 1) ** 2 * -1,
        y: (idx + 1) ** 0.5 * -1,
        duration: 685,
        delay: 200,
      }}
      in:fade={{ delay: 650, duration: 950 }}
      class="hex"
    >
      <div class="hex-in">
        <div class="hex-link">
          <picture>
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
          <h3 data-testid="hex-category-name">{category.Name}</h3>
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
    width: 90%;
    margin: 0 auto;
    font-size: 15px;
    list-style-type: none;
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
    -webkit-transform: rotate3d(0, 0, 1, -60deg) skewY(30deg);
    -ms-transform: rotate3d(0, 0, 1, -60deg) skewY(30deg);
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
    -webkit-transform: skewY(-30deg) rotate3d(0, 0, 1, 60deg);
    -ms-transform: skewY(-30deg) rotate3d(0, 0, 1, 60deg);
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
    -webkit-transform: rotate3d(0, 0, 0, 0deg);
    -ms-transform: rotate3d(0, 0, 0, 0deg);
    transform: rotate3d(0, 0, 0, 0deg);
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
    position: absolute;
    text-align: center;
    top: 45%;
  }

  .hex button {
    font-size: 1.5em;
    color: white;
    z-index: 1;
    -webkit-transform: translate3d(0, -100%, 0);
    -ms-transform: translate3d(0, -100%, 0);
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
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  @media (min-width: 1201px) {
    /* <- 5-4  hexagons per row */
    .root-categories-container {
      padding-bottom: 4.4%;
    }
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

  @media (max-width: 400px) {
    .root-categories-container {
      font-size: 13px;
    }
  }
</style>
