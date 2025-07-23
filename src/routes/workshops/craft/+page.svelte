<script lang="ts">
  import CraftOneJpg from "$lib/assets/craft_1.jpg";
  import CraftTwoJpg from "$lib/assets/craft_2.jpg";
  import CraftThreeJpg from "$lib/assets/craft_3.jpg";
  import CraftFourJpg from "$lib/assets/craft_4.jpg";
  import CraftFiveJpg from "$lib/assets/craft_5.jpg";
  import CraftSixJpg from "$lib/assets/craft_6.jpg";
  import CraftSevenJpg from "$lib/assets/craft_7.jpg";
  import CraftEightJpg from "$lib/assets/craft_8.jpg";
  import CraftOneAvif from "$lib/assets/craft_1.avif";
  import CraftTwoAvif from "$lib/assets/craft_2.avif";
  import CraftThreeAvif from "$lib/assets/craft_3.avif";
  import CraftFourAvif from "$lib/assets/craft_4.avif";
  import CraftFiveAvif from "$lib/assets/craft_5.avif";
  import CraftSixAvif from "$lib/assets/craft_6.avif";
  import CraftSevenAvif from "$lib/assets/craft_7.avif";
  import CraftEightAvif from "$lib/assets/craft_8.avif";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import SwipeImage from "$lib/components/SwipeImage/SwipeImage.svelte";
  import { fade } from "svelte/transition";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:head>
  <title>{"Enki - Children's, Hen and Private Craft Parties"}</title>
</svelte:head>

<svelte:window bind:outerWidth />
{#if browser || $page.data.whitelistedUserAgent}
  <div class="container">
    <div class="class-pics">
      {#if isMobile}
        <SwipeImage
          imgArr={[
            {
              src: isAvifSupported ? CraftOneAvif : CraftOneJpg,
              alt: "a couple enjoying their finished rings",
            },
            {
              src: isAvifSupported ? CraftTwoAvif : CraftTwoJpg,
              alt: "a couple holding hands having finished making their rings",
            },
            {
              src: isAvifSupported ? CraftThreeAvif : CraftThreeJpg,
              alt: "enki jewellery ring boxes",
            },
            {
              src: isAvifSupported ? CraftFourAvif : CraftFourJpg,
              alt: "a couple's hands showing their gothic wedding rings",
            },
            {
              src: isAvifSupported ? CraftFiveAvif : CraftFiveJpg,
              alt: "a couple holding their hands up sporting their new rings",
            },
            {
              src: isAvifSupported ? CraftSixAvif : CraftSixJpg,
              alt: "a couple midway through creating their wedding bands",
            },
            {
              src: isAvifSupported ? CraftSevenAvif : CraftSevenJpg,
              alt: "a couple smiling as they stand and inspect their rings",
            },
            {
              src: isAvifSupported ? CraftEightAvif : CraftEightJpg,
              alt: "a lady with a blow torch, heating her ring while her partner watches",
            },
          ]}
        />
      {:else}
        <div class="class-pics">
          <img
            in:fade={{ duration: 600 }}
            src={isAvifSupported ? CraftOneAvif : CraftOneJpg}
            alt="a couple enjoying their finished rings"
          />
          <img
            in:fade={{ duration: 600 }}
            src={isAvifSupported ? CraftTwoAvif : CraftTwoJpg}
            alt="a couple holding hands having finished making their rings"
          />
          <img
            in:fade={{ duration: 600 }}
            src={isAvifSupported ? CraftThreeAvif : CraftThreeJpg}
            alt="enki jewellery ring boxes"
          />
          <img
            in:fade={{ duration: 600 }}
            src={isAvifSupported ? CraftFourAvif : CraftFourJpg}
            alt="a couple's hands showing their gothic wedding rings"
          />
        </div>
      {/if}
    </div>
    <h1>Children's, Hen and Private Craft Parties!</h1>
    <p>
      We can host up to 20 people for craft workshops and up to 12 for jewellery
      workshops.<br />
      <br />
      If you would like to do a craft we don't currently offer please let us know,
      we have a huge network of local makers and would love to make your dream a
      reality!
    </p>
    <br />
    <p>
      For any queries please <a href="mailto: workshop@enkionline.com"
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
          src={isAvifSupported ? CraftFiveAvif : CraftFiveJpg}
          alt="a couple holding their hands up sporting their new rings"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported ? CraftSixAvif : CraftSixJpg}
          alt="a couple midway through creating their wedding bands"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported ? CraftSevenAvif : CraftSevenJpg}
          alt="a couple smiling as they stand and inspect their rings"
        />
        <img
          in:fade={{ duration: 600 }}
          src={isAvifSupported ? CraftEightAvif : CraftEightJpg}
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
