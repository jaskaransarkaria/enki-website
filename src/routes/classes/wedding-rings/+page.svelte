<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";
  import { fade } from "svelte/transition";

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:head>
  <title>{"Enki - Private Classes"}</title>
</svelte:head>

<svelte:window bind:outerWidth />
{#if browser || $page.data.whitelistedUserAgent}
  <div class="container">
    <div class="class-pics">
      {#if isMobile}
        <SwipeImage
          imgArr={[
            {
              src: `${PUBLIC_BUCKET_URL}/wedding_bands_1.jpg`,
              alt: "A man and a woman, the man is holding the rings in the palm of his hands",
            },
            {
              src: `${PUBLIC_BUCKET_URL}/wedding_bands_2.jpg`,
              alt: "two women looking longingly into each other's eyes wearing their rings",
            },
            {
              src: `${PUBLIC_BUCKET_URL}/wedding_bands_3.jpg`,
              alt: "enki jewellery ring boxes",
            },
            {
              src: `${PUBLIC_BUCKET_URL}/wedding_bands_4.jpg`,
              alt: "a couple embracing whilst sporting the rings they made",
            },
          ]}
        />
      {:else}
        <img
          in:fade={{ duration: 600 }}
          src={`${PUBLIC_BUCKET_URL}/wedding_bands_1.jpg`}
          alt="A man and a woman, the man is holding the rings in the palm of his hands"
        />
        <img
          in:fade={{ duration: 600 }}
          src={`${PUBLIC_BUCKET_URL}/wedding_bands_2.jpg`}
          alt="two women looking longingly into each other's eyes wearing their rings"
        />
        <img
          in:fade={{ duration: 600 }}
          src={`${PUBLIC_BUCKET_URL}/wedding_bands_3.jpg`}
          alt="enki jewellery ring boxes"
        />
        <img
          in:fade={{ duration: 600 }}
          src={`${PUBLIC_BUCKET_URL}/wedding_bands_4.jpg`}
          alt="a couple embracing whilst sporting the rings they made"
        />
      {/if}
    </div>
    <h1>
      Make your partner the most important piece of jewellery they’ll ever own
    </h1>
    <p>
      In this private class for you and your partner, you will make each other a
      wedding ring, guided by our resident jeweller, Faith.
      <br />
      <br />
      You will start with an initial silver practice ring which you will be able
      to take home after the class. You will then make the real thing in gold or
      the metal of your choice. After the class Faith will take them away to be hallmarked
      and will return them to you within two weeks.
      <br />
      <br />
      To make the experience extra special we provide cake from the wonderful Early
      Bird Bakery next door. If you aren't local we can give you lots of tips on
      where to stay and what to do in the area if you want to make a mini-break of
      it.
    </p>
    <br />
    <p>
      If you have any queries please <a href="mailto: faith@enkionline.com"
        >contact us</a
      >.
    </p>
    <br />
    <br />
    <br />
  </div>
{/if}

<style>
  h1,
  p {
    text-align: center;
    font-family: "Caviar Dreams";
  }

  p {
    text-align: center;
    width: 90%;
  }

  .container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    padding-top: 5%;
  }

  .class-pics {
    display: flex;
    flex-direction: row;
    width: 70%;
    height: 10%;
    align-self: center;
    justify-content: center;
  }

  .class-pics > img {
    height: 80px;
    padding: 5px;
  }

  @media (min-width: 600px) {
    .class-pics {
      flex-direction: row;
      width: 40%;
      margin-bottom: 2%;
    }

    .class-pics > img {
      height: 200px;
    }
  }

  @media (min-width: 960px) {
    .class-pics {
      flex-direction: row;
      width: 40%;
      margin-bottom: 2%;
    }

    .class-pics > img {
      height: 300px;
    }

    p {
      width: 50%;
    }
  }
</style>
