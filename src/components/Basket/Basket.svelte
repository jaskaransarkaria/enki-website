<script lang="typescript">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';
  import { basket } from '@/stores/basket';
  import BasketCounter from '@/components/BasketCounter/BasketCounter.svelte';
  import Checkout from '@/components/Checkout/Checkout.svelte';

  export let showPage = false;
  let basketTotalArr: { total: number }[];
  let total: string;
  $: {
    basketTotalArr = $basket.map((basketItem) => ({
      total: (basketItem.price * 100 * basketItem.quantity) / 100,
    }));
    total = basketTotalArr
      .reduce((acc: number, cur: { total: number }) => cur.total + acc, 0)
      .toFixed(2);
  }

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960 ? true : false;
</script>

<svelte:window bind:outerWidth />
<div
  class={showPage ? 'container' : isMobile ? 'mobile-container' : 'container'}
>
  {#if $basket.length}
    {#each $basket as obj (obj.id)}
      <div class={isMobile ? 'mobile-product' : 'product'} transition:fade>
        <img
          src={`https://enki.imgix.net/${obj.id}-0?auto=format`}
          alt={`${obj.name}`}
          on:click={() => $goto(`/shop/product/${obj.id}`)}
          class={isMobile ? 'mobile-product-img' : 'product-img'}
        />
        <div class={isMobile ? 'mobile-product-details' : 'product-details'}>
          <h2 class={isMobile ? 'mobile-product-name' : 'product-name'}>
            {obj.name}
          </h2>
          <h4 class={isMobile ? 'mobile-current-stock' : 'current-stock'}>
            Currently {obj.currentStock} in stock
          </h4>
          <div
            class={isMobile
              ? 'mobile-quantity-and-price'
              : 'quantity-and-price'}
          >
            <div class={isMobile ? 'mobile-quantity' : 'quantity'}>
              <h5>Quantity</h5>
              <BasketCounter productObj={obj} />
            </div>
            <h4 class={isMobile ? 'mobile-product-total' : 'product-total'}>
              {`£${((obj.price * 100 * obj.quantity) / 100).toFixed(2)}`}
            </h4>
          </div>
        </div>
      </div>
    {/each}
    <div class={isMobile ? 'mobile-total' : 'total'}>
      <h2>Total (exc. delivery):</h2>
      <div class="checkout">
        <h2>£{total}</h2>
        <Checkout />
      </div>
    </div>
    {#if isMobile}
      <div class="spacer" />
    {/if}
  {:else}
    <h1>You have nothing in your basket, continue shopping</h1>
  {/if}
</div>

<style>
  .mobile-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin-top: 55px;
    max-height: 100vh;
    width: 100vw;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.1);
    z-index: 98;
  }

  .spacer {
    position: relative;
    bottom: 100;
    height: 100px;
    width: 100vw;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .mobile-product,
  .product {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 1%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .mobile-product {
    width: 100vw;
    height: auto;
    justify-content: space-between;
  }

  .mobile-current-stock {
    text-align: center;
  }

  .current-stock {
    text-align: left;
  }

  .quantity {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 10%;
  }

  .mobile-product-name {
    font-size: 1em;
    text-align: center;
  }

  .mobile-product-details {
    margin: 5%;
    width: 50%;
  }

  .product-details {
    margin: 3%;
    width: 100%;
  }

  .quantity-and-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
  }

  .mobile-quantity-and-price {
    flex-direction: column;
  }

  .quantity > h5 {
    margin-bottom: 0;
  }

  .mobile-quantity > h5 {
    margin-bottom: 0;
    text-align: center;
  }

  .mobile-product-total {
    text-align: center;
  }

  .product-total {
    text-align: left;
  }

  .total {
    border-top: 3px double #8c8b8b;
    border-bottom: 3px double #8c8b8b;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mobile-total {
    border-top: 3px double #8c8b8b;
    border-bottom: 3px double #8c8b8b;
    margin: 1.5%;
    display: flex;
    margin-top: auto;
    margin-bottom: 55px;
    justify-content: space-between;
  }

  .mobile-product-img {
    width: 75px;
    margin: 5%;
    cursor: pointer;
  }

  .product-img {
    width: 125px;
    height: auto;
    cursor: pointer;
  }

  @media (min-width: 960px) {
    .product-img {
      width: 150px;
    }
  }

  @media (min-width: 1200px) {
    .product-img {
      width: 174px;
    }
  }

  @media (min-width: 1750px) {
    .product-img {
      width: 200px;
    }
  }
</style>
