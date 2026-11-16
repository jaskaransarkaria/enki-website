<script lang="ts">
  import { initialViewportWidth } from "#lib/utils/initialViewportWidth.js";
  import { SITE_URL } from "#lib/constants.js";
  import servicesOneJpg from "#lib/assets/services_1.jpg";
  import servicesTwoJpg from "#lib/assets/services_2.jpg";
  import servicesThreeJpg from "#lib/assets/services_3.jpg";
  import servicesFourJpg from "#lib/assets/services_4.jpg";
  import servicesOneAvif from "#lib/assets/services_1.avif";
  import servicesTwoAvif from "#lib/assets/services_2.avif";
  import servicesThreeAvif from "#lib/assets/services_3.avif";
  import servicesFourAvif from "#lib/assets/services_4.avif";
  import nineCaret from "#lib/assets/9_carat.png";
  import eighteenCaret from "#lib/assets/18_carat.png";
  import platinum from "#lib/assets/platinum.png";
  import silver from "#lib/assets/silver.png";
  import SwipeImage from "#lib/components/SwipeImage/SwipeImage.svelte";
  import { fade } from "svelte/transition";
  import { isAvifSupported } from "#lib/stores/isAvifSupported.js";
  import {
    faqJsonLd,
    jsonLdScript,
    reviewJsonLd,
    serviceJsonLd,
  } from "#lib/utils/structuredData.js";

  const repairFaqs = [
    {
      question: "How long do jewellery repairs take?",
      answer:
        "Most repairs are ready within 5–7 working days. Simple jobs like soldering a chain or cleaning can sometimes be done while you wait if a jeweller is free. Complex restorations and remodelling take longer — we'll give you a timeframe when you bring the piece in.",
    },
    {
      question: "Do I need an appointment for a jewellery repair?",
      answer:
        "No appointment needed. Drop in any day 10am–5pm. A jeweller is in most days except Tuesdays and Sundays — if you want a quote on the spot it's best to come when a jeweller is in, but you can leave your piece with us any day.",
    },
    {
      question: "How much do jewellery repairs cost?",
      answer:
        "Prices depend on the metal, the piece, and what needs doing. Ring resizing starts from around £30, chain repairs from £25, and clasp replacements from £20. We always give a free quote before starting any work — no obligation.",
    },
    {
      question: "What don't you repair?",
      answer:
        "We don't repair watches. For everything else — rings, chains, clasps, earrings, antique pieces — just bring it in and we'll take a look. We can also remodel inherited or broken jewellery into something new.",
    },
    {
      question: "Can you send me a quote from a photo?",
      answer:
        "We can give you a rough idea from a photo, but for an exact quote we need to see the piece in person. Email photos to faith@enkionline.com or drop into the shop.",
    },
  ];

  const repairReviews = [
    {
      question: "Alexandra B",
      answer:
        "Beautiful little shop. I needed a bracelet repaired and a ring setting. Faith gave me some great advice and the repairs were done quickly.",
    },
    {
      question: "Dave T",
      answer:
        "I'd been restoring a snare drum of huge sentimental value to me but the part I'd sourced needed some delicate filing to fit the existing mechanism… The staff took a real interest in the project and carried out the job there and then. I could not be happier and would highly recommend.",
    },
    {
      question: "Will M",
      answer:
        "Had my wedding ring cut off due to swollen finger, it was repaired with an additional piece added, not the slightest sign anything had happened. Would recommend her to anyone. Thank you.",
    },
    {
      question: "Claire B",
      answer:
        "I took a diamond ring to Enki to be repaired. The lady listened to my description of what was wrong. I was in and out in ten minutes with my ring repaired and very shiny. Fantastic service and very knowledgeable. Highly recommended.",
    },
  ];

  // Service list surfaced to AI answer engines — these are the canonical
  // descriptions of what the workshop can repair.
  const repairServices = [
    {
      name: "Ring resizing",
      description:
        "Resize gold, silver and platinum rings — up or down — in our Kings Heath workshop.",
      url: `${SITE_URL}/repairs`,
      price: "from £30",
    },
    {
      name: "Chain repair",
      description:
        "Solder broken chain links and rebuild worn sections so you can wear your favourite necklace again.",
      url: `${SITE_URL}/repairs`,
      price: "from £25",
    },
    {
      name: "Clasp replacement",
      description:
        "Fit a new secure clasp to necklaces, bracelets and anklets.",
      url: `${SITE_URL}/repairs`,
      price: "from £20",
    },
    {
      name: "Stone re-setting",
      description:
        "Re-set loose or fallen stones and re-tip worn claws on rings, pendants and earrings.",
      url: `${SITE_URL}/repairs`,
      price: "from £35",
    },
    {
      name: "Antique jewellery restoration",
      description:
        "Sympathetic repair and restoration of antique and heirloom pieces, including remodelling inherited jewellery into something new.",
      url: `${SITE_URL}/repairs`,
    },
    {
      name: "Earring match making",
      description:
        "Make a new partner for a lonely earring so you can wear the pair again.",
      url: `${SITE_URL}/repairs`,
    },
    {
      name: "Jewellery cleaning and polishing",
      description:
        "Professional clean and polish to bring tired jewellery back to life.",
      url: `${SITE_URL}/repairs`,
    },
  ];

  let outerWidth = $state(initialViewportWidth());
  const isMobile = $derived(outerWidth < 960);
</script>

<svelte:head>
  <title>Jewellery Repairs Kings Heath, Birmingham | Enki</title>
  <meta
    name="description"
    content="Ring resizing, chain and clasp repairs, claw re-tipping, re-stringing and more, done by jewellers in our Kings Heath workshop. Estimates before any work."
  />
  <meta
    property="og:title"
    content="Jewellery Repairs Kings Heath, Birmingham | Enki"
  />
  <meta
    property="og:description"
    content="Ring resizing, chain and clasp repairs, claw re-tipping, re-stringing and more, done by jewellers in our Kings Heath workshop. Estimates before any work."
  />
  <meta property="og:image" content={`${SITE_URL}${servicesFourJpg}`} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonLdScript(serviceJsonLd(repairServices))}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonLdScript(faqJsonLd(repairFaqs))}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonLdScript(reviewJsonLd(repairReviews))}
</svelte:head>

<svelte:window bind:outerWidth />
<div class="container">
  <br />
  <div class="shop-pics">
    {#if isMobile}
      <SwipeImage
        imgArr={[
          {
            src: $isAvifSupported ? servicesOneAvif : servicesOneJpg,
            alt: "a ring being polished on a polishing machine",
          },
          {
            src: $isAvifSupported ? servicesTwoAvif : servicesTwoJpg,
            alt: "a jewellery machine for pressing metal",
          },
          {
            src: $isAvifSupported ? servicesFourAvif : servicesFourJpg,
            alt: "a medallion being heated with a blow touch",
          },
          {
            src: $isAvifSupported ? servicesThreeAvif : servicesThreeJpg,
            alt: "some jewellery pliers and some jewellery being inspected",
          },
        ]}
      />
    {:else}
      <img
        in:fade={{ duration: 600 }}
        class="extra-width"
        src={$isAvifSupported ? servicesOneAvif : servicesOneJpg}
        alt="a ring being polished on a polishing machine"
      />
      <img
        in:fade={{ duration: 600 }}
        src={$isAvifSupported ? servicesTwoAvif : servicesTwoJpg}
        alt="a jewellery machine for pressing metal"
      />
      <img
        in:fade={{ duration: 600 }}
        class="extra-width"
        src={$isAvifSupported ? servicesThreeAvif : servicesThreeJpg}
        alt="some jewellery pliers and some jewellery being inspected"
      />
      <img
        in:fade={{ duration: 600 }}
        src={$isAvifSupported ? servicesFourAvif : servicesFourJpg}
        alt="a medallion being heated with a blow touch"
      />
    {/if}
  </div>
  <div class="repair-content">
    {#if isMobile}
      <p>
        Got a necklace you're afraid to wear because the clasp sometimes fails?
        Have a ring you've loved for such a long time that the shank has worn
        away to nothing? We hate to see jewellery thrown away, bring it in and
        we’ll get it back to its former glory. We can even create a new partner
        for a lonely earring! <a href="/contact">Get in touch.</a>
      </p>
      <div class="repairs-price-list">
        <a href="/repairs/silver-jewellery-price-list-10-02-25.pdf"
          ><img alt="sliver repairs price list" src={silver} /></a
        >
        <a href="/repairs/9ct-jewellery-price-list-10-02-25.pdf"
          ><img alt="9ct gold repairs list" src={nineCaret} /></a
        >
        <a href="/repairs/18ct-jewellery-price-list-10-02-25.pdf"
          ><img alt="18ct gold repairs list" src={eighteenCaret} /></a
        >
        <a href="/repairs/platinum-jewellery-price-list-10-02-25.pdf"
          ><img alt="platinum repairs list" src={platinum} /></a
        >
      </div>
    {:else}
      <div class="left-repair-content">
        <div class="repairs-price-list">
          <a href="/repairs/silver-jewellery-price-list-10-02-25.pdf"
            ><img alt="sliver repairs price list" src={silver} /></a
          >
          <a href="/repairs/9ct-jewellery-price-list-10-02-25.pdf"
            ><img alt="9ct gold repairs list" src={nineCaret} /></a
          >
          <a href="/repairs/18ct-jewellery-price-list-10-02-25.pdf"
            ><img alt="18ct gold repairs list" src={eighteenCaret} /></a
          >
          <a href="/repairs/platinum-jewellery-price-list-10-02-25.pdf"
            ><img alt="platinum repairs list" src={platinum} /></a
          >
        </div>
      </div>
      <p>
        Got a necklace you're afraid to wear because the clasp sometimes fails?
        Have a ring you've loved for such a long time that the shank has worn
        away to nothing? We hate to see jewellery thrown away, bring it in and
        we’ll get it back to its former glory. We can even create a new partner
        for a lonely earring! <a href="/contact">Get in touch</a>.
      </p>
    {/if}
  </div>
  <div class="testimonials-container">
    {#if isMobile}
      <h2>Testimonials</h2>
      <p>
        "Beautiful little shop. I needed a bracelet repaired and a ring setting.
        Faith gave me some great advice and the repairs were done quickly." -
        Alexandra B
      </p>
      <hr style:width="90%" />
      <p>
        "Had my wedding ring cut off due to swollen finger, it was repaired with
        an additional piece added, not the slightest sign anything had happened
        . Would recommend her to anyone. Thank you." - Will M
      </p>
      <hr style:width="90%" />
      <p>
        "I ran into trouble restoring an old Gretsch snare drum of huge
        sentimental value to me - the modern part I'd sourced in the USA arrived
        but some delicate filing was needed in order to fit the part to the
        existing mechanism… The staff were friendly and took a real interest in
        the project and carefully carried out the delicate job there and then. I
        could not be happier and would highly recommend the store, its staff and
        their considerable - and adaptable - expertise." - Dave T
      </p>
      <hr style:width="90%" />
      <p>
        "I took a diamond ring to Enki to be repaired. The lady listened to my
        description of what was wrong. She used several tools to look at the
        ring and complete the repair. I was in and out in ten minutes with my
        ring repaired and very shiny. Fantastic service and very knowledgeable.
        Highly recommended." - Claire B
      </p>
    {:else}
      <blockquote>
        Beautiful little shop. I needed a bracelet repaired and a ring setting.
        Faith gave me some great advice and the repairs were done quickly.
        <footer>
          <cite>Alexandra B</cite>
        </footer>
      </blockquote>
      <blockquote>
        I'd been restoring a snare drum of huge sentimental value to me but the
        part I'd sourced needed some delicate filing to fit the existing
        mechanism… The staff took a real interest in the project and carried out
        the job there and then. I could not be happier and would highly
        recommend the store, its staff and their considerable and adaptable
        expertise.
        <footer>
          <cite>Dave T</cite>
        </footer>
      </blockquote>
      <blockquote>
        Had my wedding ring cut off due to swollen finger, it was repaired with
        an additional piece added, not the slightest sign anything had happened.
        Would recommend her to anyone. Thank you.
        <footer>
          <cite>Will M</cite>
        </footer>
      </blockquote>
      <blockquote>
        I took a diamond ring to Enki to be repaired. The lady listened to my
        description of what was wrong. She used several tools to look at the
        ring and complete the repair. I was in and out in ten minutes with my
        ring repaired and very shiny. Fantastic service and very knowledgeable.
        Highly recommended.
        <footer>
          <cite>Claire B</cite>
        </footer>
      </blockquote>
    {/if}
  </div>
</div>

<style>
  h2 {
    text-align: center;
    font-family: "Welcomehome5 Regular";
  }

  .container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    align-items: center;
  }

  .repair-content {
    display: flex;
    flex-direction: column;
    width: 80%;
    align-self: center;
  }

  .repairs-price-list {
    width: 100%;
    text-align: center;
  }

  .repairs-price-list > a {
    margin: 1em;
    justify-self: center;
  }

  .repairs-price-list > a > img {
    margin-top: 1em;
    width: 80%;
  }

  .left-repair-content {
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .repair-content > p {
    height: 50%;
    width: auto;
    font-size: 1em;
    padding: 1em;
    border: 0.2em solid var(--accent-color);
    text-align: center;
    box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
  }

  .testimonials-container {
    display: flex;
    flex-direction: column;
  }

  blockquote {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-family: "Caviar Dreams";
    position: relative;
    margin: 1em;
    width: 15vw;
    height: 15vw;
    border: 0.2em solid var(--accent-color);
    text-align: center;
    box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
  }

  cite {
    font-family: "Caviar Dreams Italic";
  }

  blockquote:before {
    font-family: "Caviar Dreams";
    color: var(--accent-color);
    position: absolute;
    font-size: 6em;
    line-height: 1;
    top: 0;
    left: 0;
    content: "\201C";
  }
  blockquote:after {
    font-family: "Caviar Dreams";
    color: var(--accent-color);
    position: absolute;
    /* display: block; don't use this, it raised the quote too high from the bottom - defeated line-height? */
    float: right;
    font-size: 6em;
    line-height: 1;
    right: 0;
    bottom: -0.5em;
    content: "\201D";
  }
  blockquote footer {
    padding: 0 2em 0 0;
    text-align: right;
  }
  blockquote cite:before {
    content: "\2013";
  }

  .testimonials-container > p {
    margin: 1em;
  }

  .shop-pics {
    display: flex;
    flex-direction: row;
    width: 75%;
    height: 10%;
    align-self: center;
    justify-content: center;
  }

  .shop-pics > * {
    height: 100%;
    max-width: 30%;
    padding: 5px;
  }

  p {
    width: 90%;
    align-self: center;
    text-align: center;
    font-family: "Caviar Dreams";
  }

  @media (min-width: 600px) {
    .repairs-price-list {
      display: grid;
      align-self: center;
      height: auto;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }

    .repairs-price-list > a > img {
      width: 100%;
    }

    .repairs-price-list > a > img:hover {
      transform: scale(1.015);
    }
  }

  @media (min-width: 960px) {
    .repair-content > p {
      font-size: 1em;
    }

    blockquote {
      font-size: 0.6em;
      padding: 0.3em;
    }

    .testimonials-container {
      flex-direction: row;
      justify-content: center;
      width: 100%;
    }

    .repair-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    hr {
      display: none;
    }

    .shop-pics {
      height: 250px;
    }
  }

  @media (min-width: 1280px) {
    .repair-content > p {
      font-size: 100%;
    }

    blockquote {
      font-size: 0.7em;
    }

    .repairs-price-list > a {
      margin: 0.5em;
    }

    .shop-pics {
      height: 300px;
    }
  }

  @media (min-width: 1400px) {
    blockquote {
      font-size: 0.8em;
    }

    .shop-pics {
      height: 350px;
    }
  }

  @media (min-width: 1600px) {
    blockquote {
      font-size: 0.9em;
    }

    .repair-content > p {
      font-size: 1.5em;
    }

    .shop-pics {
      height: 400px;
    }
  }

  @media (min-width: 1920px) {
    blockquote {
      font-size: 1em;
    }

    .shop-pics {
      height: 450px;
    }
  }

  @media (min-width: 2200px) {
    blockquote {
      font-size: 1.2em;
    }

    .repair-content > p {
      font-size: 2em;
    }
  }
</style>
