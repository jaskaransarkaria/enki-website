<script lang="ts">
  import { goto } from '@roxi/routify';
  import MailChimpSubscribe from '@/components/MailChimpSubscribe/MailChimpSubscribe.svelte';
  import BackToTop from '@/components/BackToTop/BackToTop.svelte';

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:window bind:outerWidth />
<div class="footer">
  <div class="left-container">
    <img class="enki-icon" src="/enki_icon.jpg" alt="enki icon/ logo" />
  </div>
  <div class="centre-container">
    <BackToTop />
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
  <div class="right-container">
    <img
      class="telephone"
      src="/telephone_footer.png"
      alt="contact us"
      on:click={$goto('/contact')}
    />
    {#if !isMobile}
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
</div>

<style>
  .footer {
    position: relative;
    display: flex;
    justify-content: space-between;
    bottom: 0;
    width: 100vw;
    height: 50vh;
    z-index: 99;
    background-color: white;
    box-shadow: 0 -2.5px 20px 0 #a3a8a5;
    margin-left: 0;
    margin-right: 0;
    padding: 5px;
  }

  .left-container {
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .enki-icon {
    width: 60px;
    height: auto;
    align-self: center;
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
    font-family: 'WelcomeHome3 Regular';
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
    align-self: center;
    width: 50px;
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
      height: 15vh;
    }

    .right-container {
      margin-right: 1%;
    }

    .trust-container {
      width: 80%;
    }

    .enki-icon {
      width: 180px;
      height: auto;
    }
  }
</style>
