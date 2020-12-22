<script lang="ts">
  import type { BasketProduct } from '../../stores/basket'
  import { basket } from '../../stores/basket';

  export let productId: string;
  
  const updateBasket = (id: string, list: any) => {
    const indx = list.findIndex((obj: BasketProduct) => obj.id === productId)
    console.log(list[indx])
    return indx >= 0 ? 
      [...list.slice(0, indx), {
        id: list[indx].id,
        quantity: list[indx].quantity + 1 
      }, ...list.slice(indx + 1)] : 
      [{
        id: id,
        quantity: 1
      }, ...list];
    }
</script>

<style>
</style>

<button
  on:click={() => basket.set(updateBasket(productId, $basket))}>
  Add to Basket
</button>
