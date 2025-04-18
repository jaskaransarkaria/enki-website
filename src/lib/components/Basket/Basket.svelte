<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import { basket } from "$lib/stores/basket";
  import basketEmpty from "$lib/assets/basket_empty.png";
  import BasketCounter from "$lib/components/BasketCounter/BasketCounter.svelte";
  import Checkout from "$lib/components/Checkout/Checkout.svelte";
  import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.svelte";

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
      total: basketItem?.price * basketItem?.quantity,
    }));
    total = basketTotalArr
      .reduce((acc: number, cur: { total: number }) => cur.total + acc, 0)
      .toFixed(2);
  }

  $: outerWidth = 0;
  $: isMobile = outerWidth < 1280 ? true : false;
  $: selectedGiftWrap = $basket.filter(
    (item) =>
      item.categoryId === "32TE2EITCQ6KE4HQ34ORK6V5" ||
      item.categoryId === "KYUFP3I2BUEWSTMDUPSHQQJF"
  );
</script>

<svelte:head>
  {#if loading}
    <link rel="stylesheet" href="/loading.css" />
  {/if}
</svelte:head>

<svelte:window bind:outerWidth />
<div class="container">
  {#if loading}
    <LoadingSpinner />
    <h2>please wait while we redirect you to checkout...</h2>
  {:else if $basket.length}
    {#each $basket as obj, i (obj.id)}
      <div
        data-testid={`basket-${i}`}
        class={isMobile ? "mobile-product" : "product"}
        in:fade
      >
        <img
          src={`${PUBLIC_BUCKET_URL}/${obj.imgHash}`}
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
              <div class="gift-wrap-details">
                <label class="select-wrap" for="wrap">
                  Fancy gift wrap <a
                    data-sveltekit-preload-data
                    href="/shop/category/32TE2EITCQ6KE4HQ34ORK6V5">here</a
                  >
                  & christmas wrap
                  <a
                    data-sveltekit-preload-data
                    href="/shop/category/KYUFP3I2BUEWSTMDUPSHQQJF">here</a
                  >
                  <hr />
                  <select
                    role="combobox"
                    name="wrap"
                    id="wrap"
                    class="select-wrap"
                    bind:value={obj.giftWrapToUse}
                  >
                    {#if selectedGiftWrap.length === 0}
                      <option value="Standard brown paper" selected
                        >Standard brown paper</option
                      >
                    {:else}
                      <option value="Standard brown paper" selected
                        >Standard brown paper</option
                      >
                      {#each selectedGiftWrap as { name, id }, i (id)}
                        <option value={name}>{name}</option>
                      {/each}
                    {/if}
                  </select>
                </label>
                <textarea
                  maxlength="95"
                  placeholder="Add a message for your gift here..."
                  bind:value={obj.giftDescription}
                />
              </div>
            {/if}
            <div class="price">
              <h4 class={isMobile ? "mobile-product-total" : "product-total"}>
                {`£${(obj.price * obj.quantity).toFixed(2)}`}
              </h4>
              {#if obj?.categoryId !== "32TE2EITCQ6KE4HQ34ORK6V5"}
                <div class="gift-wrapping">
                  <label for="gift-wrap"
                    >Gift Wrap for £{GIFT_WRAP_PRICE}
                    <input
                      data-testid={`add-gift-wrap-${i}`}
                      type="checkbox"
                      id="gift-wrap"
                      name="gift-wrap"
                      checked={obj.giftWrap}
                      bind:this={giftWrap[i]}
                      on:change={() =>
                        giftWrap[i]?.checked
                          ? addGiftWrapping(i)
                          : removeGiftWrapping(i)}
                    />
                  </label>
                </div>
              {/if}
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
    <img
      in:fade={{ delay: 600 }}
      class="empty-basket"
      src={basketEmpty}
      alt="cartoon of an empty basket"
    />
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

  .empty-basket {
    width: 55%;
    height: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
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

  .price > * {
    text-align: right;
  }

  .gift-wrapping {
    margin-top: 1em;
    text-align: right;
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
  }

  .select-wrap {
    display: block;
  }

  .gift-wrap-details {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  option,
  select {
    font-size: 0.8em;
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
    .empty-basket {
      width: 30%;
    }

    .product-img {
      width: 150px;
    }
  }

  @media (min-width: 960px) {
    .product-img {
      width: 174px;
    }

    .product {
      width: 75%;
    }
  }

  @media (min-width: 1280px) {
    .empty-basket {
      width: 25%;
    }

    .gift-wrap-details {
      flex-direction: row;
      justify-content: space-evenly;
    }

    option,
    select {
      font-size: 1em;
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

    .empty-basket {
      width: 20%;
    }
  }

  @media (min-width: 1960px) {
    .empty-basket {
      width: 15%;
    }
  }
</style>
