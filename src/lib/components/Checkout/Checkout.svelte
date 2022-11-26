<script lang="ts">
  import { loadStripe } from "@stripe/stripe-js/pure.js";
  import { onMount } from "svelte";
  import { basket } from "$lib/stores/basket";
  import { createCheckoutSession } from "./createCheckoutSession";
  import { PUBLIC_STRIPE_KEY, PUBLIC_SERVER_URL } from "$env/static/public";

  let stripePromise: any;
  export let loading = false;

  onMount(async () => {
    // Create an instance of the Stripe object with your publishable API key
    // importing from pure means that stripe is not loaded before it's required.
    // however it will continue to track users once it has been loaded to the page
    // https://mtlynch.io/stripe-recording-its-customers/
    stripePromise = await loadStripe(PUBLIC_STRIPE_KEY as string);
  });

  const handleClick = async (stripePromise: any, basket: any) => {
    await createCheckoutSession(stripePromise, basket, PUBLIC_SERVER_URL);
    loading = true;
  };
</script>

<button
  id="checkout-button"
  class="goto-checkout"
  on:click={async () => await handleClick(stripePromise, $basket)}
  >Checkout</button
>

<style>
  .goto-checkout {
    border: none;
    background-color: white;
    border-radius: 4px;
    transition: filter 0.25s;
    border: 2px solid #ff6600;
    color: #ff6600;
  }

  button:hover {
    color: #ff8c00;
    border: 2px solid #ff8c00;
    cursor: pointer;
  }
</style>
