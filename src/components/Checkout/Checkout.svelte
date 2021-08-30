<script lang="typescript">
  import { loadStripe } from '@stripe/stripe-js/pure';
  import { onMount } from 'svelte';
  import { basket } from '@/stores/basket';
  import { createCheckoutSession } from './createCheckoutSession';

  let stripePromise: any;

  onMount(async () => {
    // Create an instance of the Stripe object with your publishable API key
    // importing from pure means that stripe is not loaded before it's required.
    // however it will continue to track users once it has been loaded to the page
    // https://mtlynch.io/stripe-recording-its-customers/
    stripePromise = await loadStripe(process.env.STRIPE_KEY as string);
  });
</script>

<button
  id="checkout-button"
  on:click={() => createCheckoutSession(stripePromise, $basket)}
  >Checkout</button
>
