<script lang="ts">
  import { fade } from "svelte/transition";
  import CopyIcon from "$lib/components/Svg/CopyIcon.svelte";
  import confetti from "canvas-confetti";

  import MailChimpSubscribe from "../MailChimpSubscribe/MailChimpSubscribe.svelte";
  import { isSignedUp } from "$lib/stores/newsletterModal";
  import { PUBLIC_SERVER_URL } from "$env/static/public";

  let promoCopied = false;

  const signupFn = (input: string) => {
    if (input.includes("@")) {
      confetti({
        angle: 0,
        particleCount: 100,
        startVelocity: 30,
        shapes: ["circle", "circle", "square", "star"],
        spread: 360,
        drift: 0,
        zIndex: 999,
      });
      isSignedUp.set(true);
    }
  };

  const getPromoCode = async () => {
    const res = await fetch(`${PUBLIC_SERVER_URL}/get-promo-code`);
    return res.text();
  };

  const clickFn = async (promoCode) => {
    await navigator.clipboard.writeText(promoCode);
    promoCopied = true;
  };
</script>

<div>
  {#if $isSignedUp}
    <h1><em>Thank you</em> 🎁</h1>
    <h2>Use the code below at the checkout for 10% off</h2>
  {:else}
    <h1><em>hello</em></h1>
    <h2>Sign up and save 10% off your first online purchase!</h2>
  {/if}
  {#if $isSignedUp}
    {#await getPromoCode()}
      <h1>...waiting</h1>
    {:then promoCode}
      <h1 in:fade={{ duration: 500 }}>
        <span class="promo">{promoCode}</span>
        {#if !promoCopied}
          <CopyIcon clickFn={() => clickFn(promoCode)} />
        {/if}
      </h1>
      {#if promoCopied}
        <h3>code copied to clipboard</h3>
      {/if}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  {:else}
    <MailChimpSubscribe onSignupFn={signupFn} />
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  h1 {
    font-family: "Welcomehome5 Regular";
    color: black;
  }

  h2,
  h3 {
    font-family: "Caviar Dreams";
    color: black;
  }

  h1 {
    font-size: 2.5em;
  }

  h2 {
    font-size: 2em;
  }

  .promo {
    position: relative;
    padding-bottom: 3%;
    border-bottom: 8px solid #ff6600;
  }

  @media (min-width: 360px) {
    h1 {
      font-size: 2.7em;
    }

    h2 {
      font-size: 2.2em;
    }
  }

  @media (min-width: 700px) {
    h1 {
      font-size: 2.8em;
    }

    h2 {
      font-size: 2.2em;
    }
  }

  @media (min-width: 960px) {
    h1 {
      font-size: 2.8em;
    }
    h2 {
      font-size: 2.4em;
    }
  }

  @media (min-width: 1280px) {
    h1 {
      font-size: 2.8em;
    }
    h2 {
      font-size: 2.45em;
    }
  }

  @media (min-width: 1600px) {
    h1 {
      font-size: 3em;
    }
    h2 {
      font-size: 2.5em;
    }
  }
</style>