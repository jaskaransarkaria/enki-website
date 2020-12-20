<script lang="ts">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import { categories } from '../../stores/categories';

  let data: object[] = [];

  onMount(async () => {
    // pull the category data from svelte
    const orderCatergories = (resp: object[]) =>
      resp.sort((a: object, b: object) => (a.Name < b.Name ? -1 : 1));

    const fetchCategories = async () => {
      const response = await fetch(`${process.env.SERVER_URL}/categories`);
      const parsedResult = JSON.parse(await response.json());
      return orderCatergories(parsedResult);
    };

    data = await fetchCategories();
  });
</script>

<style>
  .root-categories-container {
    display: grid;
    grid-template-rows: 25% 25% 50%;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .opening-times {
    display: block;
    flex-direction: column;
    grid-row: 1;
    grid-column: 2;
    text-align: center;
  }

  button {
    width: 22.5vw;
    height: 45vh;
  }

  button,
  button:active {
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
  }
</style>

<div class="root-categories-container">
  <div class="opening-times">
    <h1>OPENING TIMES</h1>
    <h2>Monday - Sunday: 10am - 5pm</h2>
  </div>
</div>

{#each data as category}
  <button
    on:click={() => {
      categories.set(category);
      $goto(`./${category.Id}`);
    }}>
    {category.Name}
  </button>
{/each}
