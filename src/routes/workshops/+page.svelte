<script lang="ts">
  import "#lib/styles/marketing.css";
  import { onMount } from "svelte";
  import PrivateParties from "#lib/components/Svg/PrivateParties.svelte";
  import WeddingRings from "#lib/components/Svg/WeddingRingsCharlotte.svelte";
  import ScheduledClasses from "#lib/components/Svg/ScheduledClasses.svelte";
  import { jsonLdScript, serviceJsonLd } from "#lib/utils/structuredData.js";
  import { SITE_URL } from "#lib/constants.js";
  import NewsletterStrip from "#lib/components/NewsletterStrip/NewsletterStrip.svelte";
  import { GIFT_VOUCHER_URL } from "#lib/constants.js";
  import { isAvifSupported } from "#lib/stores/isAvifSupported.js";
  import craftEightJpg from "#lib/assets/craft_8.jpg";
  import craftEightAvif from "#lib/assets/craft_8.avif";

  const workshopServices = [
    {
      name: "Scheduled jewellery and craft workshops",
      description:
        "Small-group jewellery making, lino printing and craft classes in our Kings Heath workshop. All tools, materials and light refreshments included. Up to 8 people for jewellery, more for craft.",
      url: `${SITE_URL}/workshops/scheduled`,
    },
    {
      name: "Wedding ring workshops",
      description:
        "A private full-day class for two where you make each other's wedding rings in silver, gold or platinum, guided by a resident jeweller. Includes a silver practice ring, cake from Early Bird Bakery, and hallmarking.",
      url: `${SITE_URL}/workshops/wedding-rings`,
    },
    {
      name: "Private parties and group workshops",
      description:
        "Children's parties, hen dos, birthdays and work team days. Choose from silver jewellery, beaded jewellery, lino printing or needle felting. Weekday and weekend dates available, up to 20 people for crafts.",
      url: `${SITE_URL}/workshops/craft`,
    },
  ];

  // TODO(content): replace the bracketed placeholders from the wireframes.
  const offers = [
    {
      title: "Scheduled workshops",
      meta: "from [£PRICE] · [LENGTH] · up to 8 for jewellery",
      text: "Jewellery, lino printing and more. All tools, materials and light refreshments included.",
      href: "/workshops/scheduled",
      cta: "See dates",
      drawing: ScheduledClasses,
    },
    {
      title: "Wedding ring workshops",
      meta: "from [£PRICE] · one day · for two",
      text: "A private day for you and your partner to make each other's wedding rings.",
      href: "/workshops/wedding-rings",
      cta: "Find out more",
      drawing: WeddingRings,
    },
    {
      title: "Parties & groups",
      meta: "from [£PRICE] per person · [GROUP SIZE]",
      text: "Children's parties, hens, birthdays and work team days.",
      href: "/workshops/craft",
      cta: "Plan a party",
      drawing: PrivateParties,
    },
  ];

  // Upcoming classes are listed by Ticket Tailor's widget, which needs the
  // `tt-widget` class to be (re)applied once we're in the browser.
  let ttWidget: HTMLElement | undefined = $state();
  let widgetLoaded = $state(false);
  let isGiftSeason = $state(false);

  onMount(() => {
    if (ttWidget) ttWidget.className = "tt-widget";
    widgetLoaded = true;
    // Checked on the client because this page is prerendered.
    isGiftSeason = new Date().getMonth() >= 10;
  });
</script>

<svelte:head>
  <title>Jewellery &amp; Craft Workshops in Birmingham | Enki</title>
  <meta
    name="description"
    content="Wedding ring classes, jewellery making workshops, craft classes and private parties above our shop on Kings Heath High Street, Birmingham."
  />
  <meta
    property="og:title"
    content="Jewellery &amp; Craft Workshops in Birmingham | Enki"
  />
  <meta
    property="og:description"
    content="Wedding ring classes, jewellery making workshops, craft classes and private parties above our shop on Kings Heath High Street, Birmingham."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonLdScript(serviceJsonLd(workshopServices))}
</svelte:head>

<div class="enki-announcement">
  <strong>
    {isGiftSeason ? "Give a class this Christmas." : "Give a class as a gift."}
  </strong>
  Gift vouchers posted to you or collected from the shop.
  <a href={GIFT_VOUCHER_URL} target="_blank" rel="noreferrer">Buy a voucher</a>
</div>

<main class="enki-page">
  <header class="hero center">
    <h1>Enki Workshop</h1>
    <p class="lead narrow">
      Make something you'll keep. Jewellery and craft classes, wedding ring days
      and parties in our workshop upstairs at 30 High Street, Kings Heath.
    </p>
    <div class="btn-row center">
      <a class="btn" href="#upcoming">See upcoming classes</a>
      <a
        class="btn btn-outline"
        href={GIFT_VOUCHER_URL}
        target="_blank"
        rel="noreferrer">Buy a gift voucher</a
      >
    </div>
  </header>

  <section class="section grid grid-3" aria-label="Types of workshop">
    {#each offers as offer (offer.title)}
      {@const Drawing = offer.drawing}
      <article class="framed offer">
        <div class="framed-inner">
          <div class="offer-drawing">
            <Drawing illustrationOnly />
          </div>
          <h2>{offer.title}</h2>
          <p class="muted">{offer.meta}</p>
          <p>{offer.text}</p>
          <a class="btn offer-cta" data-sveltekit-preload-data href={offer.href}
            >{offer.cta}</a
          >
        </div>
      </article>
    {/each}
  </section>

  <section class="section" id="upcoming" aria-labelledby="upcoming-title">
    <div class="section-head">
      <h2 id="upcoming-title">Upcoming classes</h2>
      <a href="/workshops/scheduled">See all dates</a>
    </div>
    <div class="tt-list">
      <div bind:this={ttWidget}>
        <div class="tt-widget-fallback">
          <p>
            <a
              href="https://www.tickettailor.com/all-tickets/enki/?ref=website_widget&show_sort=true&show_event_filter=false"
              target="_blank"
              rel="noreferrer">See upcoming classes and book tickets</a
            >
          </p>
        </div>
        {#if widgetLoaded}
          <script
            src="https://cdn.tickettailor.com/js/widgets/min/widget.js"
            data-url="https://www.tickettailor.com/all-tickets/enki/?ref=website_widget&show_sort=true&show_event_filter=false"
            data-type="inline"
            data-inline-minimal="true"
            data-inline-show-logo="false"
            data-inline-bg-fill="false"
            data-inline-inherit-ref-from-url-param=""
            data-inline-ref="website_widget"
          ></script>
        {/if}
      </div>
    </div>
    <p class="muted">Booking direct with us is always the best price.</p>
  </section>

  <section class="section panel split teams" aria-labelledby="teams-title">
    <img
      class="photo"
      src={$isAvifSupported ? craftEightAvif : craftEightJpg}
      alt="people showing off the rings, bangles and necklaces they made at a workshop"
      loading="lazy"
    />
    <div>
      <h2 id="teams-title">Work groups &amp; team days</h2>
      <p>
        Treat your team to a jewellery or craft workshop in our Kings Heath
        studio. We can host groups on weekdays as well as weekends.
      </p>
      <a class="btn btn-outline" href="/workshops/craft#plan">Plan a team day</a
      >
    </div>
  </section>

  <NewsletterStrip
    title="Can't make these dates?"
    text="Be the first to hear about new classes in our weekly newsletter."
  />
</main>

<style>
  .hero {
    padding-top: 2rem;
  }

  .offer .framed-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .offer-drawing {
    width: 100%;
    max-width: 12rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 900px) {
    .offer-drawing {
      max-width: 15rem;
    }
  }

  .offer h2 {
    font-size: 1.5rem;
  }

  .offer .muted {
    margin-bottom: 0.6rem;
  }

  /* Keep the buttons lined up along the bottom of each card */
  .offer-cta {
    margin-top: auto;
  }

  .tt-list {
    min-height: 6rem;
    margin-bottom: 1rem;
  }

  .teams .photo {
    max-height: 22rem;
  }

  .teams h2 {
    margin-top: 0;
  }
</style>
