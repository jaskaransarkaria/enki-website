<script lang="ts">
  import "#lib/styles/marketing.css";
  import EnquiryForm from "#lib/components/EnquiryForm/EnquiryForm.svelte";
  import { GIFT_VOUCHER_URL, WORKSHOP_EMAIL } from "#lib/constants.js";
  import { isAvifSupported } from "#lib/stores/isAvifSupported.js";
  import weddingBandsThreeJpg from "#lib/assets/wedding_bands_3.jpg";
  import weddingBandsNineJpg from "#lib/assets/wedding_bands_9.jpg";
  import weddingBandsElevenJpg from "#lib/assets/wedding_bands_11.jpg";
  import weddingBandsThirteenJpg from "#lib/assets/wedding_bands_13.jpg";
  import weddingBandsFifteenJpg from "#lib/assets/wedding_bands_15.jpg";
  import weddingBandsThreeAvif from "#lib/assets/wedding_bands_3.avif";
  import weddingBandsNineAvif from "#lib/assets/wedding_bands_9.avif";
  import weddingBandsElevenAvif from "#lib/assets/wedding_bands_11.avif";
  import weddingBandsThirteenAvif from "#lib/assets/wedding_bands_13.avif";
  import weddingBandsFifteenAvif from "#lib/assets/wedding_bands_15.avif";
  import { faqJsonLd, jsonLdScript } from "#lib/utils/structuredData.js";

  // FAQ content surfaced to AI answer engines (Google AI Overviews, Perplexity,
  // ChatGPT). These Q&As are the definitive answers about the service and
  // should be kept current.
  const weddingFaqs = [
    {
      question:
        "Do we need any jewellery-making experience to make our own wedding rings?",
      answer:
        "No experience needed. You'll start with a silver practice ring so you can get comfortable with the tools and techniques before making the real rings in your chosen metal.",
    },
    {
      question: "Which metals and ring styles can we choose?",
      answer:
        "You can make your rings in silver, 9ct gold, 18ct gold, or platinum. We'll talk through profile shapes (D-shape, court, flat) and widths in your pre-class consultation so the materials are ready on the day.",
    },
    {
      question: "How far ahead of our wedding should we book?",
      answer:
        "Allow at least 3 weeks for hallmarking. If you’d like platinum casting, engraving or stone setting, allow another 2 to 3 weeks. If your class is closer to the wedding, you can take your rings home on the day and bring them back to be hallmarked afterwards.",
    },
    {
      question: "We're not local. Can you help?",
      answer:
        "Absolutely. Kings Heath has great places to stay and eat, and we're 20 minutes from central Birmingham. We can give you recommendations for hotels, restaurants and things to do if you'd like to make a mini-break of it.",
    },
    {
      question: "How do we pay?",
      answer:
        "We take a deposit when you book and the balance on the day. The class fee covers tuition, tools, cake and your silver practice rings. The cost of gold or platinum for your finished rings is additional and we'll give you a quote before you book.",
    },
  ];

  const facts = [
    { label: "Price", value: "from £450 per couple (not including materials)" },
    { label: "How long", value: "3.5 hours" },
    { label: "Metals", value: "Gold, silver, platinum and Palladium" },
    { label: "Book ahead", value: "minimum 1 month before the wedding" },
  ];

  const steps = [
    {
      title: "Practise in silver",
      text: "Start with a silver practice ring, which you take home after the class.",
    },
    {
      title: "Make the real thing",
      text: "Make each other's rings in gold or the metal of your choice, with cake from Early Bird Bakery next door.",
    },
    {
      title: "Hallmarking",
      text: "We send your rings away to be officially hallmarked. This takes about 2 weeks.",
    },
    {
      title: "Ready for the big day",
      text: "Your rings come back to you in plenty of time for your wedding.",
    },
  ];

  const faqs = [
    {
      q: "Do we need any jewellery-making experience?",
      a: "No experience needed. You'll start with a silver practice ring so you can get comfortable with the tools and techniques before making the real rings in your chosen metal.",
    },
    {
      q: "Which metals and ring styles can we choose?",
      a: "You can make your rings in silver, 9ct gold, 18ct gold, or platinum. If you'd like to fit your ring around an engagement ring we can do that and we'll talk through profile shapes (D-shape, court, flat) and widths in your pre-class consultation so the materials are ready on the day.",
    },
    {
      q: "How far ahead of our wedding should we book?",
      a: "Allow at least 3 weeks for hallmarking. If you’d like platinum casting, engraving or stone setting, allow another 2 to 3 weeks. If your class is closer to the wedding, you can take your rings home on the day and bring them back to be hallmarked afterwards.",
    },
    {
      q: "We're not local. Can you help?",
      a: "We can give you lots of tips on where to stay and what to do in the area if you'd like to make a mini-break of it.",
    },
  ];

  const gallery = $derived([
    {
      src: $isAvifSupported ? weddingBandsElevenAvif : weddingBandsElevenJpg,
      alt: "a couple's hands showing their gothic wedding rings",
    },
    {
      src: $isAvifSupported
        ? weddingBandsThirteenAvif
        : weddingBandsThirteenJpg,
      alt: "a couple midway through creating their wedding bands",
    },
    {
      src: $isAvifSupported ? weddingBandsThreeAvif : weddingBandsThreeJpg,
      alt: "finished wedding rings in Enki ring boxes",
    },
    {
      src: $isAvifSupported ? weddingBandsFifteenAvif : weddingBandsFifteenJpg,
      alt: "a lady with a blow torch, heating her ring while her partner watches",
    },
  ]);
</script>

<svelte:head>
  <title>Make Your Own Wedding Rings, Birmingham | Enki</title>
  <meta
    name="description"
    content="Make each other's wedding rings in a private class with our jewellers in Kings Heath, Birmingham. Silver, gold or platinum, hallmarked before the big day."
  />
  <meta
    property="og:title"
    content="Make Your Own Wedding Rings, Birmingham | Enki"
  />
  <meta
    property="og:description"
    content="Make each other's wedding rings in a private class with our jewellers in Kings Heath, Birmingham. Silver, gold or platinum, hallmarked before the big day."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonLdScript(faqJsonLd(weddingFaqs))}
</svelte:head>

<main class="enki-page">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="/workshops">Workshops</a></li>
      <li aria-current="page">Wedding ring workshops</li>
    </ol>
  </nav>

  <section class="split hero">
    <img
      class="photo hero-photo"
      src={$isAvifSupported ? weddingBandsNineAvif : weddingBandsNineJpg}
      alt="a couple enjoying their finished rings at the workbench"
    />
    <div>
      <h1>Make each other's wedding rings</h1>
      <p>
        A private class for you and your partner, guided by one of our resident
        jewellers, in our Kings Heath workshop.
      </p>
      <dl class="facts facts-2">
        {#each facts as fact (fact.label)}
          <div class="fact">
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        {/each}
      </dl>
      <div class="btn-row">
        <a class="btn" href="#enquire">Enquire about dates</a>
        <a
          class="btn btn-outline"
          href={GIFT_VOUCHER_URL}
          target="_blank"
          rel="noreferrer">Give it as a voucher</a
        >
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="how-title">
    <h2 class="section-title" id="how-title">How the day works</h2>
    <ol class="steps grid grid-4">
      {#each steps as step, i (step.title)}
        <li class="framed step">
          <div class="framed-inner">
            <span class="step-number" aria-hidden="true">{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </li>
      {/each}
    </ol>
  </section>

  <section class="section photo-row" aria-label="Photos from our classes">
    {#each gallery as image (image.alt)}
      <img class="photo" src={image.src} alt={image.alt} loading="lazy" />
    {/each}
  </section>

  <section class="section" aria-labelledby="faq-title">
    <h2 class="section-title" id="faq-title">Questions</h2>
    <div class="faq">
      {#each faqs as faq (faq.q)}
        <details>
          <summary>{faq.q}</summary>
          <p>{faq.a}</p>
        </details>
      {/each}
    </div>
  </section>

  <section class="section panel" id="enquire" aria-labelledby="enquire-title">
    <h2 id="enquire-title">Enquire about dates</h2>
    <p>Tell us a little about you and we'll get back to you within 3 days.</p>
    <EnquiryForm to={WORKSHOP_EMAIL} subject="Wedding ring workshop enquiry">
      <div class="field">
        <label for="wr-names">Your names</label>
        <input id="wr-names" name="names" autocomplete="name" required />
      </div>
      <div class="field">
        <label for="wr-email">Email</label>
        <input
          id="wr-email"
          name="email"
          type="email"
          autocomplete="email"
          required
        />
      </div>
      <div class="field">
        <label for="wr-date">Wedding date</label>
        <input id="wr-date" name="wedding-date" type="date" />
      </div>
      <div class="field">
        <label for="wr-metal">Metal you're thinking of</label>
        <select id="wr-metal" name="metal">
          <option>Not sure yet</option>
          <option>Silver</option>
          <option>Gold</option>
          <option>Platinum</option>
        </select>
      </div>
      <div class="field field-full">
        <label for="wr-notes"
          >Anything else? Dates that suit you, ring ideas, questions</label
        >
        <textarea id="wr-notes" name="notes"></textarea>
      </div>
      <div class="field field-full">
        <label for="wr-photos">Inspiration photos (optional)</label>
        <input
          id="wr-photos"
          name="photos"
          type="file"
          multiple
          accept="image/*"
        />
      </div>
    </EnquiryForm>
  </section>
</main>

<style>
  .hero {
    align-items: start;
  }

  .hero-photo {
    aspect-ratio: 5 / 4;
  }

  @media (min-width: 600px) {
    .facts-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
