<script lang="ts">
  import { onMount } from 'svelte';

  export let categoryId: string;

  let productArr: object[] = [];

  onMount(async () => {
    // fetch all the products in a specific category
    const fetchProductsByCategoryId = async (id: string) => {
      console.log('cat', id);
      const response = await fetch(
        `${process.env.SERVER_URL}/products-by-category?id=${id}`
      );
      const result = await response.json();
      console.log('resp', result);
      return result;
    };
    productArr = await fetchProductsByCategoryId(categoryId);
  });
</script>

<style>
  .products-container {
    display: grid;
    grid-template-rows: 25% 25% 50%;
    grid-template-columns: 1fr 1fr 1fr;
  }

  button {
    width: 22.5vw;
    height: 15vh;
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

<h1>{categoryId}</h1>
<div class="products-container">
  {#each productArr as product}
    <button>
      {`${product.Name} -- ${product.Id} -- ${product.SalePrice}`}
    </button>
  {/each}
</div>
