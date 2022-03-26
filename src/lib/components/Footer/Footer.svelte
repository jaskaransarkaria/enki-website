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
        class="telephone"
        src="https://enki.imgix.net/telephone.png?auto=format,compress"
        alt="contact us"
        on:click={() => goto("/contact")}
      />
  </div>
    {/if}
  <div class="centre-container">
    <h3>want to be the first to find out about new products and classes?</h3>
    <MailChimpSubscribe />
    {#if isMobile}
      <div class="trust-container">
        <a
          href="https://stripe.com/docs/payments/cards/supported-card-brands"
          target="blank"
        >
          <img
            class="trust-badge"
            src="/stripe-badge-white.png"
            alt="stripe trust badge"
          />
        </a>
      </div>
    {/if}
  </div>
    {#if !isMobile}
  <div class="right-container">
      <div class="trust-container">
        <a
          href="https://stripe.com/docs/payments/cards/supported-card-brands"
          target="blank"
        >
          <img
            class="trust-badge"
            src="/stripe-badge-white.png"
            alt="stripe trust badge"
          />
        </a>
      </div>
  </div>
    {/if}
</div>

<style>
  .footer {
    position: relative;
    display: flex;
    justify-content: space-between;
    bottom: 0;
    width: 100vw;
    height: 50vh;
    background-color: white;
    box-shadow: 0 -2.5px 20px 0 #a3a8a5;
    margin-left: 0;
    margin-right: 0;
    padding: 5px;
  }

  .left-container {
    height: 100%;
    width: 7.5%;
    display: flex;
    justify-content: center;
  }

  .centre-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 10px;
    position: absolute;
    left: 50%;
    height: 90%;
    transform: translateX(-50%);
  }

  h3 {
    text-align: center;
    font-family: "WelcomeHome3 Regular";
    font-size: 12px;
  }

  .right-container {
    display: flex;
    justify-content: space-between;
    width: 15%;
    height: 100%;
    margin-right: 5%;
  }

  .telephone {
    width: 95px;
    height: 95px;
    align-self: center;
  }

  .telephone:hover {
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
    align-self: center;
    width: 100%;
  }

  .trust-badge {
    width: 100%;
  }

  @media (min-width: 600px) {
    .footer {
      height: 60vh;
    }
  }

  @media (min-width: 960px) {
    .footer {
      height: 40vh;
      bottom: 0;
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
      height: 22.5vh;
    }
  }

  @media (min-width: 2400px) {
    .footer {
      height: 15vh;
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
