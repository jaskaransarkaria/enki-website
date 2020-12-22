<script lang="ts">
  import { basket } from '../../stores/basket';

  export let productId: string;
</script>

<style>
</style>

<button
  on:click={() => {
    const updatedBasket = [...$basket, productId];
    basket.set(updatedBasket);
  }}>
  Add to Basket
</button>
