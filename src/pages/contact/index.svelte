<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div class="contact-us-container">
  <div class="contact-info">
    <h1>Contact us</h1>
    <img
      in:fade={{ duration: 1200 }}
      src="https://enki.imgix.net/maps.png?auto=format,compress"
      alt="hand drawn street map symbol with location pin"
    />
    <address>
      30 High Street Kings Heath, B14 7JT <br /> Open every day 10am-5pm
    </address>
    <img
      in:fade={{ duration: 1200 }}
      src="https://enki.imgix.net/telephone.png?auto=format,compress"
      alt="hand drawn old style home telephone with handset on top and dial around keys"
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

  .contact-info > img {
    height: 50px;
    width: 50px;
  }

  address {
    text-align: center;
    align-self: center;
  }

  h1 {
    text-align: center;
    font-family: 'WelcomeHome3 Regular';
  }

  p {
    font-family: 'Caviar Dreams';
    text-align: center;
  }

  @media (min-width: 600px) {
    .contact-info {
      width: 100%;
    }

    .submissions-text {
      width: 60%;
    }
  }
</style>
