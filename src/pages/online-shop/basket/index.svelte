<script lang="typescript">
  import { basket } from '@/stores/basket';
  import BasketCounter from '@/components/BasketCounter/BasketCounter.svelte';
</script>

<div class="container">
  {#each $basket as obj (obj.id)}
    <div class="product">
      <img src={`https://enki.imgix.net/${obj.id}-0`} alt={`${obj.name}`} />
      <h3>{obj.name}</h3>
      <h4>Find out whether it is in stock or not</h4>
      <h3>Quantity</h3>
      <div class="quantity">
        <BasketCounter productObj={obj} />
      </div>
    </div>
  {/each}
</div>

<style>
  .container,
  .product {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .quantity {
    display: flex;
    width: 45%;
    justify-content: space-evenly;
  }
</style>
