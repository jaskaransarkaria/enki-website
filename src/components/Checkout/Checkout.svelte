<script lang="typescript">
  import { loadStripe } from '@stripe/stripe-js/pure';
  import { onMount } from 'svelte';
  import { basket } from '@/stores/basket';
  import { createCheckoutSession } from './createCheckoutSession';

  let stripePromise: any;
  export let loading = false;

  onMount(async () => {
    // Create an instance of the Stripe object with your publishable API key
    // importing from pure means that stripe is not loaded before it's required.
    // however it will continue to track users once it has been loaded to the page
    // https://mtlynch.io/stripe-recording-its-customers/
    stripePromise = await loadStripe(process.env.STRIPE_KEY as string);
  });

  const handleClick = (stripePromise: any, basket: any) => {
    createCheckoutSession(stripePromise, basket);
    loading = true;
  };
</script>

<button
  id="checkout-button"
  class="goto-checkout"
  on:click={() => handleClick(stripePromise, $basket)}>Checkout</button
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
