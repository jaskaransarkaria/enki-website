<script lang="ts">
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import { basket } from "$lib/stores/basket";
  import BasketCounter from "$lib/components/BasketCounter/BasketCounter.svelte";
  import Checkout from "$lib/components/Checkout/Checkout.svelte";

  let basketTotalArr: { total: number }[];
  let total: string;
  let loading = false;
  let giftWrap: HTMLInputElement[] = [];

  const GIFT_WRAP_PRICE = 0.95;

  const addGiftWrapping = (i: number) => {
    $basket[i].price += GIFT_WRAP_PRICE;
    $basket[i].giftWrap = true;
  };

  const removeGiftWrapping = (i: number) => {
    $basket[i].price -= GIFT_WRAP_PRICE;
    $basket[i].giftWrap = false;
  };

  $: {
    basketTotalArr = $basket.map((basketItem) => ({
      total: (basketItem?.price * 100 * basketItem?.quantity) / 100,
    }));
    total = basketTotalArr
      .reduce((acc: number, cur: { total: number }) => cur.total + acc, 0)
      .toFixed(2);
  }

  $: outerWidth = 0;
  $: isMobile = outerWidth < 1280 ? true : false;
</script>

<svelte:window bind:outerWidth />
<div class="container" style={`cursor: ${loading ? "wait" : "default"}`}>
  {#if $basket.length}
    {#each $basket as obj, i (obj.id)}
      <div class={isMobile ? "mobile-product" : "product"} in:fade>
        <img
          src={`https://enki.imgix.net/${obj.id}-0?auto=format,compress`}
          alt={`${obj.name}`}
          on:click={() => goto(`/shop/product/${obj.id}`)}
          class={isMobile ? "mobile-product-img" : "product-img"}
        />
        <div class={isMobile ? "mobile-product-details" : "product-details"}>
          <h2 class={isMobile ? "mobile-product-name" : "product-name"}>
            {obj.name}
          </h2>
          <div
            class={isMobile
              ? "mobile-quantity-and-price"
              : "quantity-and-price"}
          >
            <div class={isMobile ? "mobile-quantity" : "quantity"}>
              <BasketCounter productObj={obj} />
              <br />
            </div>
            {#if giftWrap[i] && giftWrap[i].checked}
              <textarea
                maxlength="500"
                placeholder="Add a message for your gift here..."
                bind:value={obj.giftDescription}
              />
            {/if}
            <div class="price">
              <h4 class={isMobile ? "mobile-product-total" : "product-total"}>
                {`£${((obj.price * 100 * obj.quantity) / 100).toFixed(2)}`}
              </h4>
              <div class="gift-wrapping">
                <label for="gift-wrap"
                  >Gift Wrap for £{GIFT_WRAP_PRICE}
                  <input
                    type="checkbox"
                    id="gift-wrap"
                    name="gift-wrap"
                    value="true"
                    bind:this={giftWrap[i]}
                    on:change={() =>
                      giftWrap[i]?.checked
                        ? addGiftWrapping(i)
                        : removeGiftWrapping(i)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
    <div class={isMobile ? "mobile-total" : "total"}>
      <div class="checkout">
        <h2>Subtotal: £{total}</h2>
        <h5>Tax included & shipping calculated at checkout</h5>
        <Checkout bind:loading />
      </div>
    </div>
  {:else}
    <h1>You have nothing in your basket, continue shopping</h1>
  {/if}
</div>

<style>
  * {
    font-family: "Caviar Dreams";
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
    width: 45%;
    margin: 1%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .mobile-product {
    width: 100vw;
    height: auto;
    justify-content: space-between;
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
    margin: 3%;
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

  .mobile-quantity {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mobile-quantity-and-price {
    flex-direction: column;
  }

  .mobile-product-total {
    text-align: center;
  }

  .product-total {
    text-align: left;
  }

  .price {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .gift-wrapping {
    margin-top: 1em;
    text-align: center;
  }

  .total {
    width: 55%;
    display: flex;
    justify-content: flex-end;
  }

  .mobile-total {
    margin: 1.5%;
    display: flex;
    margin-top: auto;
    margin-bottom: 55px;
    justify-content: space-between;
  }

  .mobile-product-img {
    width: 100px;
    margin: 5%;
    cursor: pointer;
    flex: 0 0 20%;
  }

  .product-img {
    width: 125px;
    height: auto;
    cursor: pointer;
    flex: 0 0 20%;
  }

  textarea {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  h2,
  h4 {
    margin-top: 1em;
    margin-bottom: 0;
  }
  .checkout {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @media (min-width: 600px) {
    .product-img {
      width: 150px;
    }
  }

  @media (min-width: 960px) {
    .product-img {
      width: 174px;
    }

    .product {
      width: 55%;
    }
  }

  @media (min-width: 1750px) {
    .product-img {
      width: 200px;
      flex: 0 0 200px;
    }

    .product-total {
      font-size: 1.5em;
    }
  }
</style>
