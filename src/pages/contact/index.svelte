<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div class="contact-us-container">
  <div class="contact-info">
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
      01214444453 | 07712442736 | <a href="mailto: faith@enkionline.com"
        >faith@enkionline.com</a
      >
    </p>
  </div>
  <div class="contact-description">
    <h1>Submissions</h1>
    <p>
      If you have a product you would like us to consider stocking at Enki,
      please send us an email with images, cost prices, minimum order quantities
      and links to your website and social media. We get a lot of these requests
      and are limited on space so please don’t take it personally if we can't
      stock your work.
    </p>
  </div>
</div>

<style>
  .contact-us-container {
    display: flex;
    width: 100vw;
    height: 70vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .contact-info {
    display: grid;
    width: 25%;
    grid-template-columns: 75px 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .contact-us-container > div {
    margin: 4em;
  }

  address {
    text-align: center;
  }

  h1 {
    text-align: center;
    font-family: 'WelcomeHome3 Regular';
  }

  p {
    font-family: 'Caviar Dreams';
    text-align: center;
  }

  .contact-description {
    width: 60%;
  }
</style>
