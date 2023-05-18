<script lang="ts">
  import { spring } from "svelte/motion";
  import { basket } from "$lib/stores/basket";
  import { updateBasket } from "$lib/utils/basket";

  import type { BasketProduct } from "$lib/types/basketProduct";

  export let productObj: BasketProduct;

  const displayedCount = spring();
  $: displayedCount.set(productObj.quantity);
  $: offset = modulo($displayedCount, 1);

  function modulo(n: number, m: number) {
    // handle negative numbers
    return ((n % m) + m) % m;
  }
</script>

<div class="counter">
  <button
    on:click={() =>
      productObj.quantity < productObj.currentStock
        ? basket.set(
            updateBasket(
              {
                Id: productObj.id,
                Name: productObj.name,
                SalePrice: productObj.price,
                CurrentStock: productObj.currentStock,
                CategoryId: productObj.categoryId,
              },
              $basket,
              "incrementQuantity"
            )
          )
        : undefined}
    aria-label="Increase the counter by one"
  >
    +
  </button>

  <div class="counter-viewport">
    <div class="counter-digits" style:transform="translate(0, {100 * offset}%)">
      <strong style:top="-100%" aria-hidden="true"
        >{Math.floor($displayedCount + 1)}</strong
      >
      <strong>{Math.floor($displayedCount)}</strong>
    </div>
  </div>

  <button
    on:click={() =>
      basket.set(
        updateBasket(
          {
            Id: productObj.id,
            Name: productObj.name,
            SalePrice: productObj.price,
            CurrentStock: productObj.currentStock,
            CategoryId: productObj.categoryId,
          },
          $basket,
          "decrementQuantity"
        )
      )}
    aria-label="Decrease the counter by one"
  >
    -
  </button>
</div>

<style>
  .counter {
    display: flex;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 1em;
    width: 60px;
  }

  .counter button {
    font-family: "Caviar Dreams";
    padding: 0;
    border: 0;
    background-color: transparent;
    color: black;
    text-align: center;
    margin: 0;
    font-size: 1em;
    width: 35px;
  }

  .counter button:hover {
    background-color: lightgray;
    cursor: pointer;
  }
  .counter-viewport {
    width: 100%;
    height: 4em;
    overflow: hidden;
    text-align: center;
    position: relative;
  }

  .counter-viewport strong {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    color: var(--accent-color);
    font-size: 1.4em;
    align-items: center;
    justify-content: center;
  }

  .counter-digits {
    height: 100%;
  }

  @media (min-width: 960px) {
    .counter {
      width: 80px;
    }
    .counter button {
      font-size: 1.5em;
    }
  }

  @media (min-width: 1750px) {
    .counter {
      width: 100px;
    }
  }
</style>
