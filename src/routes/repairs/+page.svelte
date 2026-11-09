<script lang="ts">
  import "#lib/styles/marketing.css";
  import EnquiryForm from "#lib/components/EnquiryForm/EnquiryForm.svelte";
  import {
    GOOGLE_REVIEWS_URL,
    REPAIRS_EMAIL,
    SITE_URL,
  } from "#lib/constants.js";
  import { isAvifSupported } from "#lib/stores/isAvifSupported.js";
  import servicesOneJpg from "#lib/assets/services_1.jpg";
  import servicesTwoJpg from "#lib/assets/services_2.jpg";
  import servicesThreeJpg from "#lib/assets/services_3.jpg";
  import servicesFourJpg from "#lib/assets/services_4.jpg";
  import servicesOneAvif from "#lib/assets/services_1.avif";
  import servicesTwoAvif from "#lib/assets/services_2.avif";
  import servicesThreeAvif from "#lib/assets/services_3.avif";
  import servicesFourAvif from "#lib/assets/services_4.avif";
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

  const steps = [
    {
      title: "Bring it in",
      text: "Drop your jewellery off at the shop, or send us a photo first.",
    },
    {
      title: "Get a free quote",
      text: "We look at it and tell you the price before we start any work.",
    },
    {
      title: "Collect it",
      text: "We'll let you know when it's ready, usually within 2 weeks.",
    },
  ];

  const commonRepairs = [
    { name: "Ring resizing", price: "from £35" },
    { name: "Chain repair (soldering broken links)", price: "from £25" },
    { name: "New clasp", price: "from £25" },
    { name: "Stone re-setting", price: "from £20" },
  ];

  // TODO(content): add before & after photos. The section stays hidden until
  // there's at least one pair.
  const beforeAfter: {
    before: string;
    after: string;
    caption: string;
  }[] = [];

  const reviews = [
    {
      quote:
        "Beautiful little shop. I needed a bracelet repaired and a ring setting. Faith gave me some great advice and the repairs were done quickly.",
      by: "Alexandra B",
    },
    {
      quote:
        "I'd been restoring a snare drum of huge sentimental value to me but the part I'd sourced needed some delicate filing to fit the existing mechanism… The staff took a real interest in the project and carried out the job there and then.",
      by: "Dave T",
    },
    {
      quote:
        "Had my wedding ring cut off due to swollen finger, it was repaired with an additional piece added, not the slightest sign anything had happened.",
      by: "Will M",
    },
    {
      quote:
        "I was in and out in ten minutes with my ring repaired and very shiny. Fantastic service and very knowledgeable. Highly recommended.",
      by: "Claire B",
    },
  ];

  const heroPhotos = $derived([
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
      alt: "a medallion being heated with a blow torch",
    },
    {
      src: $isAvifSupported ? servicesThreeAvif : servicesThreeJpg,
      alt: "jewellery pliers and a piece of jewellery being inspected",
    },
  ]);
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

<main class="enki-page">
  <section class="split hero">
    <div>
      <h1>Jewellery repairs in Kings Heath</h1>
      <p class="lead">
        Got a necklace you're afraid to wear because the clasp keeps failing, or
        a ring you've worn so long the band has worn thin? We hate seeing
        jewellery thrown away. Our jewellers repair all kinds of jewellery right
        here in our workshop, and we can even make a new partner for a lonely
        earring.
      </p>
      <p class="panel panel-mint when">
        <strong>When to come in:</strong> a jeweller is in most days except Tuesdays
        and Sundays. You can drop repairs off any day, 10am–5pm.
      </p>
      <div class="btn-row">
        <a class="btn" href="#quote">Send a photo for a quote</a>
        <a class="btn btn-outline" href="#how-it-works">How it works</a>
      </div>
    </div>
    <div class="hero-photos">
      {#each heroPhotos as image (image.alt)}
        <img class="photo" src={image.src} alt={image.alt} />
      {/each}
    </div>
  </section>

  <section class="section" id="how-it-works" aria-labelledby="how-title">
    <h2 class="section-title" id="how-title">How it works</h2>
    <ol class="steps grid grid-3">
      {#each steps as step, i (step.title)}
        <li class="framed step center">
          <div class="framed-inner">
            <span class="step-number" aria-hidden="true">{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </li>
      {/each}
    </ol>
  </section>

  <section class="section split repairs-info">
    <div>
      <h2>Common repairs</h2>
      <table class="price-table">
        <tbody>
          {#each commonRepairs as repair (repair.name)}
            <tr>
              <th scope="row">{repair.name}</th>
              <td>{repair.price}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <p class="muted">
        Prices depend on the metal and the piece. Not sure? Bring it in for a
        free quote.
      </p>
    </div>
    <div>
      <h2>What we can help with</h2>
      <div class="panel">
        <p>
          <strong>Yes:</strong> rings, chains, clasps, earrings, antique jewellery,
          remodelling old pieces, and making a match for a lost earring.
        </p>
        <p>
          <strong>Engraving:</strong> available through a trusted local engraver,
          so it takes a little longer.
        </p>
        <p><strong>Sorry, no:</strong> we don't repair watches.</p>
      </div>
    </div>
  </section>

  {#if beforeAfter.length}
    <section class="section" aria-labelledby="ba-title">
      <h2 class="section-title" id="ba-title">Before &amp; after</h2>
      <div class="grid grid-3">
        {#each beforeAfter as item (item.caption)}
          <figure class="before-after">
            <div class="pair">
              <img
                class="photo"
                src={item.before}
                alt="Before: {item.caption}"
              />
              <img class="photo" src={item.after} alt="After: {item.caption}" />
            </div>
            <figcaption class="muted">{item.caption}</figcaption>
          </figure>
        {/each}
      </div>
    </section>
  {/if}

  <section class="section" aria-labelledby="reviews-title">
    <h2 class="section-title" id="reviews-title">What customers say</h2>
    <div class="grid grid-4">
      {#each reviews as review (review.by)}
        <blockquote class="review">
          <p>“{review.quote}”</p>
          <footer>{review.by}, Google review</footer>
        </blockquote>
      {/each}
    </div>
    <p class="center reviews-link">
      <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer"
        >Read all our Google reviews</a
      >
    </p>
  </section>

  <section class="section panel" id="quote" aria-labelledby="quote-title">
    <h2 id="quote-title">Send a photo for a quote</h2>
    <p>
      We'll give you a rough idea of price. For an exact quote we'll need to see
      the piece in person.
    </p>
    <EnquiryForm
      to={REPAIRS_EMAIL}
      subject="Repair quote request"
      footer="(Photos of the piece attached)"
      submitLabel="Send"
      columns={2}
    >
      <div class="field">
        <label for="rq-name">Your name</label>
        <input id="rq-name" name="name" autocomplete="name" required />
      </div>
      <div class="field">
        <label for="rq-contact">Email or phone</label>
        <input id="rq-contact" name="contact" required />
      </div>
      <div class="field field-full">
        <label for="rq-details">What needs doing?</label>
        <textarea id="rq-details" name="details" required></textarea>
      </div>
      <div class="field field-full">
        <label for="rq-photos">Photos of the piece</label>
        <input
          id="rq-photos"
          name="photos"
          type="file"
          multiple
          accept="image/*"
        />
        <p class="photo-hint">
          Front, back and any damage — a few photos help us give you an accurate
          quote. There's a 10&nbsp;MB total limit.
        </p>
      </div>
    </EnquiryForm>
  </section>
</main>

<style>
  .hero {
    align-items: start;
    padding-top: 1.5rem;
  }

  .hero-photos {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }

  .hero-photos .photo {
    aspect-ratio: 5 / 4;
  }

  .when {
    font-size: 0.95rem;
  }

  .step .step-number {
    font-size: 2.2rem;
  }

  .repairs-info {
    align-items: start;
  }

  .price-table {
    width: 100%;
    margin-bottom: 1rem;
    border-collapse: collapse;
  }

  .price-table th,
  .price-table td {
    padding: 0.7rem 0;
    border-bottom: 1px solid var(--enki-line);
    font-weight: normal;
    text-align: left;
  }

  .price-table td {
    padding-left: 1rem;
    font-weight: bold;
    text-align: right;
    white-space: nowrap;
  }

  .before-after {
    margin: 0;
  }

  .pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
    margin-bottom: 0.4rem;
  }

  .pair .photo {
    aspect-ratio: 1 / 1;
  }

  .remodel {
    padding: clamp(1.25rem, 3vw, 2rem);
  }

  .reviews-link {
    margin-top: 1.25rem;
  }

  .photo-hint {
    margin: 0;
    padding: 0.9rem 1rem;
    border: 1px dashed #b9b9b9;
    border-radius: var(--enki-radius);
    background: #fff;
    font-size: 0.95rem;
  }
</style>
