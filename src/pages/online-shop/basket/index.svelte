<script lang="typescript">
  import type { BasketProduct } from '@/stores/basket';
  import { basket } from '@/stores/basket';
  import { updateBasket } from '@/libs/basket';
</script>

{#each $basket as obj (obj.id)}
  <div>
    <img src={`https://enki.imgix.net/${obj.id}-0`} alt={`${obj.name}`} />
    <h3>{obj.name}</h3>
    <h4>Find out whether it is in stock or not</h4>
    <button
      class="add-to-basket"
      on:click={() =>
        basket.set(
          updateBasket(
            { id: obj.id.toString(), name: obj.name },
            $basket,
            'incrementQuantity'
          )
        )}
    >
      Add to Basket
    </button>
    <h3>Quantity: {obj.quantity}</h3>
    <button
      on:click={() =>
        basket.set(
          updateBasket(
            { id: obj.id.toString(), name: obj.name },
            $basket,
            'decrementQuantity'
          )
        )}
    >
      Remove from Basket
    </button>
  </div>
{/each}
