<script lang="ts">
  import { spring } from "svelte/motion";
  import { basket } from "$lib/stores/basket";
  import { updateBasket } from "$lib/utils/basket";

  import type { BasketProduct } from "$lib/stores/basket";

  export let productObj: BasketProduct;

  const displayed_count = spring();
  $: displayed_count.set(productObj.quantity);
  $: offset = modulo($displayed_count, 1);

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
                Id: parseInt(productObj.id, 10),
                Name: productObj.name,
                SalePrice: productObj.price,
                CurrentStock: productObj.currentStock,
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
    <div
      class="counter-digits"
      style="transform: translate(0, {100 * offset}%)"
    >
      <strong style="top: -100%" aria-hidden="true"
        >{Math.floor($displayed_count + 1)}</strong
      >
      <strong>{Math.floor($displayed_count)}</strong>
    </div>
  </div>

  <button
    on:click={() =>
      basket.set(
        updateBasket(
          {
            Id: parseInt(productObj.id, 10),
            Name: productObj.name,
            SalePrice: productObj.price,
            CurrentStock: productObj.currentStock,
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
