<script lang="ts">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';

  let data: object[] = []

  onMount(() => {
    // pull the category data from svelte
    const orderCatergories = (resp: object[]) => resp.sort((a: object, b: object) => a.Name < b.Name ? -1 : 1)
    const fetchCategories = async () => {
      const response = await fetch(`${process.env.SERVER_URL}/categories`)
      const parsedResult = JSON.parse(await response.json())
      data = orderCatergories(parsedResult)
    }
    fetchCategories()
  })

  const kebabCaseCategory = (str: string) => {
    // strip out non url-friendly characters
    return str.toLowerCase().split(" ").join("-")
  }
</script>

<style>
  .product-container {
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

  .products {
    display: flex;
    justify-content: space-around;
    grid-row: 2 /3;
    grid-column: 1 / 4;
  }

  img,
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

<div class="product-container">
  <div class="opening-times">
    <h1>OPENING TIMES</h1>
    <h2>Monday - Sunday: 10am - 5pm</h2>
  </div>
  <!-- <div class="products">
    <button id="cards-button" on:click={$goto('/online-shop/cards')}><img
        src="/cards.png"
        alt="cards button" /></button>
    <button id="gifts-button" on:click={$goto('/online-shop/gifts')}><img
        src="/gifts.png"
        alt="gifts button" /></button>
    <button
      id="childrens-gifts-button"
      on:click={$goto('/online-shop/childrens-gifts')}><img
        src="/childrens-gifts.png"
        alt="childrens gifts button" /></button>
  </div> -->
</div>

{#each data as category}
    <button on:click={$goto(`/online-shop/${kebabCaseCategory(category.Name)}`)}>{category.Name}</button>
{/each}