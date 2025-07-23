<script lang="ts">
  import dora from "$lib/assets/dora_1.png";
  import faith from "$lib/assets/faith_1.png";
  import ellis from "$lib/assets/ellis.png";
  import leftEnkiJpg from "$lib/assets/left_enki.jpg";
  import leftEnkiAvif from "$lib/assets/left_enki.avif";
  import aboutShopJpg from "$lib/assets/about_shop_1.jpg";
  import aboutShopAvif from "$lib/assets/about_shop_1.avif";
  import rightEnkiJpg from "$lib/assets/right_enki.jpg";
  import rightEnkiAvif from "$lib/assets/right_enki.avif";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";
  import { fade } from "svelte/transition";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:head>
  <title>{"Enki - About"}</title>
  <meta property="og:url" content="https://enkionline.com/about" />
</svelte:head>

<svelte:window bind:outerWidth />
{#if browser || $page.data.whitelistedUserAgent}
  <div class="container">
    <div class="shop-pics">
      {#if isMobile}
        <SwipeImage
          imgArr={[
            {
              src: isAvifSupported ? leftEnkiAvif : leftEnkiJpg,
              alt: "a rectangular wooden display inside the shop",
            },
            {
              src: isAvifSupported ? aboutShopAvif : aboutShopJpg,
              alt: "the shop front and it's window display",
            },
            {
              src: isAvifSupported ? rightEnkiAvif : rightEnkiJpg,
              alt: "a wooden jeweller's work bench inside the shop",
            },
          ]}
        />
      {:else}
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported ? leftEnkiAvif : leftEnkiJpg}
          alt="a rectangular wooden display inside the shop"
        />
        <img
          in:fade={{ duration: 600 }}
          class="center-image"
          src={isAvifSupported ? aboutShopAvif : aboutShopJpg}
          alt="the shop front and it's window display"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported ? rightEnkiAvif : rightEnkiJpg}
          alt="a wooden jeweller's work bench inside the shop"
        />
      {/if}
    </div>
    <h1>About</h1>
    <p class="about-shop">
      Enki is a unique gift shop and fully functioning jewellers workshop. We
      repair all types of jewellery onsite and also teach group and private
      jewellery workshops. The Kings Heath store shows the work of many
      independent crafts people who have become almost invisible on the high
      street today. From baby clothes to pottery, jewellery to cushions, we have
      just the gift you're looking for. <br /><br />We also sell beautiful and
      unique cards and wrapping paper to make your present that bit more
      special.
    </p>
    <h2>Meet the team</h2>
    <div class="employee-cards">
      <div class="card">
        <img
          in:fade={{ duration: 600 }}
          src={faith}
          alt="shop owner faith cartoon"
        />
        <p>
          Faith started Enki in 2017 in a small shop not far from the current
          location. She is a jeweller with over ten years of experience who
          specialises in repairing antique jewellery. She's at the shop on
          Mondays and Fridays.
        </p>
      </div>
      <div class="card">
        <img
          in:fade={{ duration: 600 }}
          src={dora}
          alt="shop manager cartoon"
        />
        <p>
          Dora joined Enki in 2018 and has been making jewellery ever since,
          she’s always been a crafter and can do amazing things with beads! She
          comes from Germany but has been in Brum since 2016. You can find her
          at Enki Wednesday to Saturday and every other Sunday.
        </p>
      </div>
      <div class="card">
        <img
          in:fade={{ duration: 600 }}
          src={ellis}
          alt="Sunday/ Monday shop keeper cartoon"
        />
        <p>
          Ellis joined us in 2022 on a part time basis, and works as a graphic
          artist and designer in the city too. You can find their work at
          <a href="https://www.instagram.com/ellismilesdesigner/" rel="_blank"
            >@ellismilesdesigner</a
          > on Instagram, and they work at Enki on Sundays, Mondays and Tuesdays!
        </p>
      </div>
    </div>
  </div>
{/if}

<style>
  h1,
  h2 {
    text-align: center;
    font-family: "Welcomehome5 Regular";
  }

  .container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .shop-pics {
    display: flex;
    flex-direction: row;
    height: 10%;
    width: 70%;
    align-self: center;
    justify-content: center;
  }

  .shop-pics > * {
    width: 30%;
    padding: 5px;
  }

  .center-image {
    width: 60%;
  }

  .about-shop {
    width: 90%;
  }

  p {
    align-self: center;
    text-align: center;
    font-family: "Caviar Dreams";
  }

  .employee-cards {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 30px;
  }

  .card {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card > p {
    justify-content: flex-start;
    vertical-align: top;
    width: 75%;
  }

  .card > img {
    height: 60%;
    width: 70%;
  }

  @media (min-width: 960px) {
    .employee-cards {
      width: 70%;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }
  }
</style>
