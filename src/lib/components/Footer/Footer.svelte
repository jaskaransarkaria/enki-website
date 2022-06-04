<script lang="ts">
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import MailChimpSubscribe from "$lib/components/MailChimpSubscribe/MailChimpSubscribe.svelte";

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:window bind:outerWidth />
<div class="footer" transition:fade={{ delay: 600, duration: 800 }}>
  {#if !isMobile}
    <div class="left-container">
      <img
        class="footer-icons"
        src="https://enki.imgix.net/telephone_3.png?q=100"
        alt="contact us"
        on:click={() => goto("/contact")}
      />
      <img
        class="footer-icons"
        src="https://enki.imgix.net/insta_logo_3.png?q=100"
        alt="link to instagram"
        on:click={() => goto("https://www.instagram.com/enkionline/?hl=en")}
      />
      <img
        class="footer-icons"
        src="https://enki.imgix.net/fb_logo_3.png?q=100"
        alt="link to facebook"
        on:click={() => goto("https://www.facebook.com/Enki-1665334930147391")}
      />
    </div>
  {/if}
  <div class="centre-container">
    <h3>Want to be the first to find out about new products and classes?</h3>
    <MailChimpSubscribe />
    {#if isMobile}
      <div class="mobile-footer">
        <a href="/terms-and-conditions">Terms and conditions</a>
        <a href="/privacy-policy">Privacy policy</a>
        <div class="mobile-icons">
          <img
            class="mobile-footer-icons"
            src="https://enki.imgix.net/telephone.png?auto=format,compress"
            alt="contact us"
            on:click={() => goto("/contact")}
          />
          <img
            class="mobile-footer-icons"
            src="https://enki.imgix.net/insta_logo_3.png?q=100"
            alt="link to instagram"
            on:click={() => goto("https://www.instagram.com/enkionline/?hl=en")}
          />
          <img
            class="mobile-footer-icons"
            src="https://enki.imgix.net/fb_logo_3.png?q=100"
            alt="link to facebook"
            on:click={() =>
              goto("https://www.facebook.com/Enki-1665334930147391")}
          />
        </div>
      </div>
    {/if}
  </div>
  {#if !isMobile}
    <div class="right-container">
      <div class="trust-container">
        <a
          data-testid="supported-card-brands"
          href="https://stripe.com/docs/payments/cards/supported-card-brands"
          target="blank"
        >
          <img
            class="trust-badge"
            src="/stripe-badge-white.png"
            alt="stripe trust badge"
          />
        </a>
        <a href="/terms-and-conditions">Terms and conditions</a>
        <a href="/privacy-policy">Privacy policy</a>
      </div>
    </div>
  {/if}
</div>

<style>
  .footer {
    position: relative;
    display: flex;
    justify-content: center;
    bottom: 0;
    max-width: 100vw;
    height: 50vh;
    background-color: white;
    box-shadow: 0 -2.5px 20px 0 #a3a8a5;
    margin-left: 0;
    margin-right: 0;
    padding: 5px;
    align-items: center;
  }

  .left-container {
    height: 100%;
    width: 15%;
    display: flex;
    justify-content: space-evenly;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    align-items: flex-start;
    height: 50%;
  }

  .centre-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 10px;
    row-gap: 8px;
    position: absolute;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
  }

  .mobile-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mobile-icons {
    align-items: flex-start;
    margin: 1em;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  h3,
  a {
    text-align: center;
    font-family: "Caviar Dreams";
    font-size: 16px;
  }

  .right-container {
    display: flex;
    justify-content: space-between;
    width: 15%;
    height: 100%;
    margin-right: 5%;
  }

  .footer-icons,
  .mobile-footer-icons {
    width: 20%;
    object-fit: contain;
  }

  .footer-icons:hover {
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s;
    cursor: pointer;

    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }

  .trust-container {
    display: flex;
    align-self: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .trust-badge {
    width: 100%;
  }

  @media (min-width: 360px) {
    .footer-icons,
    .mobile-footer-icons {
      width: 15%;
    }
  }
  @media (min-width: 600px) {
    .footer {
      justify-content: space-between;
      align-items: center;
      height: 40vh;
    }
    .footer-icons,
    .mobile-footer-icons {
      width: 10%;
    }
  }

  @media (min-width: 960px) {
    .footer {
      height: 31vh;
    }

    .left-container {
      align-self: center;
      width: 25%;
    }

    .centre-container {
      width: inherit;
    }

    .footer-icons,
    .mobile-footer-icons {
      align-self: flex-start;
      width: 20%;
    }

    .right-container {
      margin-right: 1%;
      flex-direction: column;
      justify-content: center;
    }

    .trust-container {
      width: 100%;
    }
  }

  @media (min-width: 1260px) {
    .footer {
      height: 30vh;
    }

    .footer-icons {
      width: 20%;
    }
  }

  @media (min-width: 1600px) {
    .left-container {
      width: 20%;
    }
  }

  @media (min-width: 1920px) {
    .footer {
      height: 28vh;
    }

    .footer-icons {
      width: 15%;
    }
  }

  @media (min-width: 2400px) {
    .footer {
      height: 22.5vh;
    }

    .right-container {
      flex-direction: row;
      justify-content: space-between;
    }

    .trust-container {
      width: 80%;
    }
  }
</style>
