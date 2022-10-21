<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<svelte:head>
  <meta property="og:url" content="https://enkionline.com/contact" />
</svelte:head>

<div class="contact-us-container">
  <div class="contact-info">
    <h1>Contact us</h1>
    <a
      target="_blank"
      href="https://goo.gl/maps/vEXPs22hUBs2CgdH8"
      rel="noreferrer"
    >
      <img
        in:fade={{ duration: 600 }}
        src="https://enki.imgix.net/maps.png?auto=format,compress"
        alt="hand drawn street map symbol with location pin"
        class="map"
      />
    </a>
    <address>
      30 High Street Kings Heath, B14 7JT <br /> Open every day 10am-5pm
    </address>
    <img
      in:fade={{ duration: 600 }}
      src="https://enki.imgix.net/telephone.png?auto=format,compress"
      alt="hand drawn old style home telephone with handset on top and dial around keys"
      class="telephone"
    />
    <p>
      <a href="tel:01214444453">01214444453</a> |
      <a href="tel:07712442736">07712442736</a>
      | <a href="mailto: faith@enkionline.com">faith@enkionline.com</a>
    </p>
    <h1>Submissions</h1>
    <p class="submissions-text">
      If you have a product you would like us to consider stocking at Enki,
      please send us an email with images, cost prices, minimum order quantities
      and links to your website and social media. We get a lot of these requests
      and are limited on space so unfortunately are only able to take a small
      selection of the submissions we receive.
    </p>
  </div>
</div>

<style>
  .contact-us-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: space-evenly;
    padding: 20px;
    margin-top: 1em;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contact-info > * {
    margin: 0.5em;
  }

  address {
    font-family: "Caviar Dreams Italic";
    text-align: center;
    align-self: center;
  }

  h1 {
    text-align: center;
    font-family: "Welcomehome5 Regular";
  }

  p {
    font-family: "Caviar Dreams";
    text-align: center;
  }

  .telephone,
  .map {
    height: auto;
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

  @media (min-width: 600px) {
    .contact-info {
      width: 100%;
    }

    .submissions-text {
      width: 60%;
    }

    .telephone,
    .map {
      height: auto;
      width: 100px;
    }
  }
</style>
