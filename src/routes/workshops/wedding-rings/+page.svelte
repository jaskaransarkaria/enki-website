<script lang="ts">
  import weddingBandsThreeJpg from "$lib/assets/wedding_bands_3.jpg";
  import weddingBandsNineJpg from "$lib/assets/wedding_bands_9.jpg";
  import weddingBandsTenJpg from "$lib/assets/wedding_bands_10.jpg";
  import weddingBandsElevenJpg from "$lib/assets/wedding_bands_11.jpg";
  import weddingBandsTwelveJpg from "$lib/assets/wedding_bands_12.jpg";
  import weddingBandsThirteenJpg from "$lib/assets/wedding_bands_13.jpg";
  import weddingBandsFourteenJpg from "$lib/assets/wedding_bands_14.jpg";
  import weddingBandsFifteenJpg from "$lib/assets/wedding_bands_15.jpg";
  import weddingBandsThreeAvif from "$lib/assets/wedding_bands_3.avif";
  import weddingBandsNineAvif from "$lib/assets/wedding_bands_9.avif";
  import weddingBandsTenAvif from "$lib/assets/wedding_bands_10.avif";
  import weddingBandsElevenAvif from "$lib/assets/wedding_bands_11.avif";
  import weddingBandsTwelveAvif from "$lib/assets/wedding_bands_12.avif";
  import weddingBandsThirteenAvif from "$lib/assets/wedding_bands_13.avif";
  import weddingBandsFourteenAvif from "$lib/assets/wedding_bands_14.avif";
  import weddingBandsFifteenAvif from "$lib/assets/wedding_bands_15.avif";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";
  import { fade } from "svelte/transition";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:head>
  <title>{"Enki - Private Wedding Classes"}</title>
</svelte:head>

<svelte:window bind:outerWidth />
{#if browser || $page.data.whitelistedUserAgent}
  <div class="container">
    <div class="class-pics">
      {#if isMobile}
        <SwipeImage
          imgArr={[
            {
              src: isAvifSupported ? weddingBandsNineAvif : weddingBandsNineJpg,
              alt: "a couple enjoying their finished rings",
            },
            {
              src: isAvifSupported ? weddingBandsTenAvif : weddingBandsTenJpg,
              alt: "a couple holding hands having finished making their rings",
            },
            {
              src: isAvifSupported
                ? weddingBandsThreeAvif
                : weddingBandsThreeJpg,
              alt: "enki jewellery ring boxes",
            },
            {
              src: isAvifSupported
                ? weddingBandsElevenAvif
                : weddingBandsElevenJpg,
              alt: "a couple's hands showing their gothic wedding rings",
            },
            {
              src: isAvifSupported
                ? weddingBandsTwelveAvif
                : weddingBandsTwelveJpg,
              alt: "a couple holding their hands up sporting their new rings",
            },
            {
              src: isAvifSupported
                ? weddingBandsThirteenAvif
                : weddingBandsThirteenJpg,
              alt: "a couple midway through creating their wedding bands",
            },
            {
              src: isAvifSupported
                ? weddingBandsFourteenAvif
                : weddingBandsFourteenJpg,
              alt: "a couple smiling as they stand and inspect their rings",
            },
            {
              src: isAvifSupported
                ? weddingBandsFifteenAvif
                : weddingBandsFifteenJpg,
              alt: "a lady with a blow torch, heating her ring while her partner watches",
            },
          ]}
        />
      {:else}
        <div class="class-pics">
          <img
            in:fade={{ duration: 600 }}
            src={isAvifSupported ? weddingBandsNineAvif : weddingBandsNineJpg}
            alt="a couple enjoying their finished rings"
          />
          <img
            in:fade={{ duration: 600 }}
            src={isAvifSupported ? weddingBandsTenAvif : weddingBandsTenJpg}
            alt="a couple holding hands having finished making their rings"
          />
          <img
            in:fade={{ duration: 600 }}
            src={isAvifSupported ? weddingBandsThreeAvif : weddingBandsThreeJpg}
            alt="enki jewellery ring boxes"
          />
          <img
            in:fade={{ duration: 600 }}
            src={isAvifSupported
              ? weddingBandsElevenAvif
              : weddingBandsElevenJpg}
            alt="a couple's hands showing their gothic wedding rings"
          />
        </div>
      {/if}
    </div>
    <h1>
      Make your partner the most important piece of jewellery they’ll ever own
    </h1>

    <p>
      In this private class for you and your partner, you will make each other a
      wedding ring, guided by one of our resident jewellers.
      <br />
      <br />
      You will start with an initial silver practice ring which you will be able
      to take home after the class. You will then make the real thing in gold or
      the metal of your choice which will be taken away to be hallmarked before being
      returned to you in plenty of time for your big day.
      <br />
      <br />
      To make the experience extra special we provide cake from the wonderful Early
      Bird Bakery next door. If you aren't local we can give you lots of tips on
      where to stay and what to do in the area if you want to make a mini-break of
      it.
    </p>
    <br />
    <p>
      If you have any queries please <a href="mailto: workshop@enkionline.com"
        >contact us</a
      >.
    </p>
    <br />
    <br />
    <br />
    {#if !isMobile}
      <div class="class-pics">
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported ? weddingBandsTwelveAvif : weddingBandsTwelveJpg}
          alt="a couple holding their hands up sporting their new rings"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported
            ? weddingBandsThirteenAvif
            : weddingBandsThirteenJpg}
          alt="a couple midway through creating their wedding bands"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported
            ? weddingBandsFourteenAvif
            : weddingBandsFourteenJpg}
          alt="a couple smiling as they stand and inspect their rings"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported
            ? weddingBandsFifteenAvif
            : weddingBandsFifteenJpg}
          alt="a lady with a blow torch, heating her ring while her partner watches"
        />
      </div>
    {/if}
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
