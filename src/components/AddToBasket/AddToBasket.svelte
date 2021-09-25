<script lang="typescript">
  import type { BasketProduct } from '@/stores/basket';
  import { basket } from '@/stores/basket';

  export let productId: number;

  const removeItemFromBasket = (
    currentQuantity: number,
    list: BasketProduct[],
    listIndx: number
  ): BasketProduct[] =>
    currentQuantity === 1
      ? [...list.slice(0, listIndx), ...list.slice(listIndx + 1)]
      : [
          ...list.slice(0, listIndx),
          {
            id: list[listIndx].id,
            quantity: list[listIndx].quantity - 1,
          },
          ...list.slice(listIndx + 1),
        ];

  const addItemToBasket = (
    list: BasketProduct[],
    listIndx: number
  ): BasketProduct[] => [
    ...list.slice(0, listIndx),
    {
      id: list[listIndx].id,
      quantity: list[listIndx].quantity + 1,
    },
    ...list.slice(listIndx + 1),
  ];

  const addNewItemToBasket = (
    id: string,
    list: BasketProduct[]
  ): BasketProduct[] => [
    {
      id: id,
      quantity: 1,
    },
    ...list,
  ];

  const updateBasket = (
    id: string,
    list: BasketProduct[],
    updateType: string
  ): BasketProduct[] => {
    const indx = list.findIndex((obj: BasketProduct) => obj.id === id);
    updateType = indx >= 0 ? updateType : 'newItem';
    switch (updateType) {
      case 'incrementQuantity':
        return addItemToBasket(list, indx);
      case 'decrementQuantity':
        return removeItemFromBasket(list[indx].quantity, list, indx);
      case 'newItem':
        return addNewItemToBasket(id, list);
      default:
        return [];
    }
  };
</script>

{#if productId}
  <button
    on:click={() =>
      basket.set(
        updateBasket(productId.toString(), $basket, 'incrementQuantity')
      )}
  >
    Add to Basket
  </button>
  {#if $basket.findIndex((obj) => obj.id === productId.toString()) >= 0}
    <button
      on:click={() =>
        basket.set(
          updateBasket(productId.toString(), $basket, 'decrementQuantity')
        )}
    >
      Remove from Basket
    </button>
  {/if}
{/if}

<style>
  button {
    cursor: pointer;
  }
</style>
