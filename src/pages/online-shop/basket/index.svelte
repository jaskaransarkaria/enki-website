<script lang="typescript">
  import { goto } from '@roxi/routify';
  import { fade } from 'svelte/transition';
  import { basket } from '@/stores/basket';
  import BasketCounter from '@/components/BasketCounter/BasketCounter.svelte';

  let basketTotalArr: any;
  let total: string;
  $: {
    basketTotalArr = $basket.map((basketItem) => ({
      total: (basketItem.price * 100 * basketItem.quantity) / 100,
    }));
    total = basketTotalArr
      .reduce((acc: number, cur: { total: number }) => cur.total + acc, 0)
      .toFixed(2);
  }
</script>

<div class="container">
  {#if $basket.length}
    {#each $basket as obj (obj.id)}
      <div class="product" transition:fade>
        <img
          src={`https://enki.imgix.net/${obj.id}-0`}
          alt={`${obj.name}`}
          on:click={() => $goto(`/online-shop/product/${obj.id}`)}
        />
        <div class="product-details">
          <h2>{obj.name}</h2>
          <h4>Currently {obj.currentStock} in stock</h4>
          <div class="quantity-and-price">
            <div class="quantity">
              <h5>Quantity</h5>
              <BasketCounter productObj={obj} />
            </div>
            <h4>{`£${((obj.price * 100 * obj.quantity) / 100).toFixed(2)}`}</h4>
          </div>
        </div>
      </div>
    {/each}
    <div class="total">
      <h2>Total (excluding delivery):</h2>
      <h2>£{total}</h2>
    </div>
  {:else}
    <h1>You have nothing in your basket, continue shopping</h1>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .product {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 1%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .quantity {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 10%;
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

  .quantity > h5 {
    margin-bottom: 0;
  }

  .total {
    border-top: 3px double #8c8b8b;
    border-bottom: 3px double #8c8b8b;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    width: 125px;
    height: auto;
    cursor: pointer;
  }

  @media (min-width: 960px) {
    img {
      width: 150px;
    }
  }

  @media (min-width: 1200px) {
    img {
      width: 174px;
    }
  }

  @media (min-width: 1750px) {
    img {
      width: 200px;
    }
  }
</style>
