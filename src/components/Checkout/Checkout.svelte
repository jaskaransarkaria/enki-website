<script>
  import { loadStripe } from '@stripe/stripe-js/pure';
  import { onMount } from 'svelte';
  import { basket } from '@/stores/basket';

  let stripePromise;

  onMount(async () => {
    // Create an instance of the Stripe object with your publishable API key
    // importing from pure means that stripe is not loaded before it's required.
    // however it will continue to track users once it has been loaded to the page
    // https://mtlynch.io/stripe-recording-its-customers/
    stripePromise = await loadStripe(process.env.STRIPE_KEY);
  });
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    // Create a new Checkout Session using the server-side endpoint you
    // created in step 3.
    const response = await fetch(
      `${process.env.SERVER_URL}/create-checkout-session`,
      {
        method: 'POST',
        body: JSON.stringify($basket),
      }
    );

    const session = await response.json();
    console.log('session', session);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, you should display the localized error message to your
    // customer using `error.message`.
    if (result.error) {
      alert(result.error.message);
    }
  };
</script>

<button id="checkout-button" on:click={createCheckoutSession}>Checkout</button>
