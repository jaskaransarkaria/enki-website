<script lang="typescript">
  import { getGridCols, calcShowGrid, calcRowNumber } from '@/libs/gridCalc';
  import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.svelte';
  import Hex from '@/components/Hex/Hex.svelte';
  import isCategory from '@/types/isCategory';
  import isTag from '@/types/isTag';

  import type { Base, BaseFn } from '@/types/base';
  import type { Category } from '@/types/category';
  import type { Tag } from '@/types/tag';

  export let data: Base[] = [];
  export let categoryFn: BaseFn;
  export let showFullPage = true;

  const createEmptyArray = (length: number) =>
    new Array(length).fill(undefined);

  let imgElemArr: HTMLImageElement[] = [...createEmptyArray(data.length)];
  let sourceElemArr: HTMLSourceElement[] = [...createEmptyArray(data.length)];
  let loadedElemArr: boolean[] = [...createEmptyArray(data.length)];
  let itemsOnLastRow: number;

  $: gridColumnNumber = getGridCols(window.innerWidth) / 2;
  $: filteredData = data.filter(
    (base: Base): base is Category | Tag =>
      isTag(base) ||
      (isCategory(base) &&
        base.NominalCode !== 'NOT_WEB' &&
        base.NominalCode !== 'CLASSES')
  );
  $: showGrid = calcShowGrid(window.innerWidth, filteredData.length);

  $: rowNumber =
    filteredData.length > gridColumnNumber
      ? calcRowNumber(filteredData.length, gridColumnNumber, 1)
      : 1;
  $: rowOffset = Math.floor(
    rowNumber % 2 === 0 ? rowNumber / 2 : (rowNumber - 1) / 2
  ); // the even rows are 1 shorter
  $: hexesForCompleteGrid = rowNumber * gridColumnNumber - rowOffset;
  $: emptyHexes = createEmptyArray(hexesForCompleteGrid - filteredData.length);
  $: if (rowNumber) {
    itemsOnLastRow =
      (rowNumber % 2 === 0 ? gridColumnNumber - 1 : gridColumnNumber) -
      emptyHexes.length;
  }
</script>

<ul
  class={showGrid
    ? 'root-categories-container'
    : showFullPage
    ? 'flexbox-container'
    : 'flexbox-container flexbox-container-no-height'}
>
  {#each filteredData as category, idx (category.Id)}
    {#if idx === filteredData.length - itemsOnLastRow}
      {#if filteredData.length > gridColumnNumber && emptyHexes.length}
        {#each emptyHexes.slice(0, Math.floor(emptyHexes.length / 2)) as _}
          <li class={showGrid ? 'hex' : 'hex-flex'}>
            <Hex isEmpty />
          </li>
        {/each}
      {/if}
    {/if}
    <li class={showGrid ? 'hex' : 'hex-flex'}>
      <Hex
        {categoryFn}
        {loadedElemArr}
        {idx}
        {category}
        {sourceElemArr}
        {imgElemArr}
      />
    </li>
    {#if idx === filteredData.length - 1}
      {#if filteredData.length > gridColumnNumber && emptyHexes.length}
        {#each emptyHexes.slice(0, Math.ceil(emptyHexes.length / 2)) as _}
          <li class={showGrid ? 'hex' : 'hex-flex'}>
            <Hex isEmpty />
          </li>
        {/each}
      {/if}
    {/if}
  {:else}
    <LoadingSpinner />
  {/each}
</ul>

<style>
  .root-categories-container {
    display: grid;
    grid-gap: 35px;
    grid-template-columns: repeat(10, 1fr);
    margin: 0 auto;
    overflow: hidden;
    list-style-type: none;
    padding: 4.5%;
    padding-bottom: 15%;
    padding-top: 2%;
    min-height: 45vh;
    align-items: center;
  }

  .flexbox-container {
    margin: auto;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
    list-style-type: none;
    justify-content: center;
    padding: 0;
    padding-bottom: 15%;
  }

  .flexbox-container-no-height {
    height: auto;
  }

  .hex-flex {
    width: 40%;
    margin: 1%;
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

  .hex:hover,
  .hex-flex:hover {
    transform: scale(1.015);
  }

  @media (min-width: 700px) {
    .flexbox-container {
      padding-bottom: 8%;
      height: 55vh;
      align-items: center;
      justify-content: center;
    }

    .flexbox-container-no-height {
      height: auto;
    }

    .hex-flex {
      width: 25%;
      margin: 1%;
    }
  }

  @media (min-width: 960px) {
    .flexbox-container {
      padding-bottom: 5%;
    }

    .hex-flex {
      width: 18%;
      margin: 1%;
    }
  }

  @media (min-width: 1600px) {
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

    .hex-flex {
      width: 10%;
      margin: 1%;
    }
  }

  @media (min-width: 2400px) {
    .root-categories-container {
      padding-bottom: 5%;
      grid-gap: 3px;
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
