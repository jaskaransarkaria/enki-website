export const createCheckoutSession = async (
  stripePromise: any,
  basket: any
): Promise<void> => {
  const stripe = await stripePromise;
  // Create a new Checkout Session using the server-side endpoint you
  // created in step 3.
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify(basket),
    }
  );

  const session = await response.json();

  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, you should display the localized error message to your
    // customer using `error.message`.
    alert(result.error.message);
  }
};
