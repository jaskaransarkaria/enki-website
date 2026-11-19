<script lang="ts">
  import "#lib/styles/marketing.css";
  import EnquiryForm from "#lib/components/EnquiryForm/EnquiryForm.svelte";
  import { WORKSHOP_EMAIL } from "#lib/constants.js";
  import { isAvifSupported } from "#lib/stores/isAvifSupported.js";
  import CraftOneJpg from "#lib/assets/craft_1.jpg";
  import CraftTwoJpg from "#lib/assets/craft_2.jpg";
  import CraftThreeJpg from "#lib/assets/craft_3.jpg";
  import CraftFourJpg from "#lib/assets/craft_4.jpg";
  import CraftFiveJpg from "#lib/assets/craft_5.jpg";
  import CraftSixJpg from "#lib/assets/craft_6.jpg";
  import CraftSevenJpg from "#lib/assets/craft_7.jpg";
  import CraftEightJpg from "#lib/assets/craft_8.jpg";
  import CraftOneAvif from "#lib/assets/craft_1.avif";
  import CraftTwoAvif from "#lib/assets/craft_2.avif";
  import CraftThreeAvif from "#lib/assets/craft_3.avif";
  import CraftFourAvif from "#lib/assets/craft_4.avif";
  import CraftFiveAvif from "#lib/assets/craft_5.avif";
  import CraftSixAvif from "#lib/assets/craft_6.avif";
  import CraftSevenAvif from "#lib/assets/craft_7.avif";
  import CraftEightAvif from "#lib/assets/craft_8.avif";

  const partyTypes = [
    // {
    //   title: "Children's parties",
    //   text: "A hands-on craft party, with everything set up and tidied away for you.",
    //   meta: "Ages [X–Y] · from [£PRICE] per child · [LENGTH]",
    // },
    {
      title: "Hen parties",
      text: "Make jewellery or crafts together, and everyone takes home what they made.",
      meta: "from £35 per person for 2hrs",
    },
    {
      title: "Private & work groups",
      text: "Birthdays, get-togethers and team days. Weekday and weekend dates available.",
      meta: "from £35 per person for 2hrs",
    },
  ];

  const goodToKnow = [
    { label: "Group size", value: "Jewellery up to 12, craft up to 20" },
    { label: "Minimum booking", value: "6 people" },
    {
      label: "Food & drink",
      value: "Bring your own food, we have an oven and microwave!",
    },
    { label: "When", value: "We can make most days work, just get in contact" },
  ];

  const crafts = [
    "Silver jewellery",
    "Beaded jewellery",
    "Lino printing",
    "Needle felting",
  ];

  const topPhotos = $derived([
    {
      src: $isAvifSupported ? CraftOneAvif : CraftOneJpg,
      alt: "guests making crafts together at a private party",
    },
    {
      src: $isAvifSupported ? CraftTwoAvif : CraftTwoJpg,
      alt: "a craft workshop in progress around the workbench",
    },
    {
      src: $isAvifSupported ? CraftThreeAvif : CraftThreeJpg,
      alt: "a workshop guest inspecting their bangle",
    },
    {
      src: $isAvifSupported ? CraftFourAvif : CraftFourJpg,
      alt: "finished pieces from a craft party",
    },
  ]);

  const bottomPhotos = $derived([
    {
      src: $isAvifSupported ? CraftFiveAvif : CraftFiveJpg,
      alt: "a guest talking through her work with the workshop teacher",
    },
    {
      src: $isAvifSupported ? CraftSixAvif : CraftSixJpg,
      alt: "tools and materials laid out for a workshop",
    },
    {
      src: $isAvifSupported ? CraftSevenAvif : CraftSevenJpg,
      alt: "party guests working on their crafts",
    },
    {
      src: $isAvifSupported ? CraftEightAvif : CraftEightJpg,
      alt: "people showing off their finished rings, bangles and necklaces",
    },
  ]);
</script>

<svelte:head>
  <title>Hen Party &amp; Private Craft Workshops Birmingham | Enki</title>
  <meta
    name="description"
    content="Private jewellery and craft parties in Kings Heath, Birmingham: hen dos, birthdays and kids' parties. Lino printing, beading, needle felting and more."
  />
  <meta
    property="og:title"
    content="Hen Party &amp; Private Craft Workshops Birmingham | Enki"
  />
  <meta
    property="og:description"
    content="Private jewellery and craft parties in Kings Heath, Birmingham: hen dos, birthdays and kids' parties. Lino printing, beading, needle felting and more."
  />
</svelte:head>

<main class="enki-page">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="/workshops">Workshops</a></li>
      <li aria-current="page">Parties &amp; groups</li>
    </ol>
  </nav>

  <div class="photo-row">
    {#each topPhotos as image (image.alt)}
      <img class="photo" src={image.src} alt={image.alt} />
    {/each}
  </div>

  <header class="hero center">
    <h1>Children's, hen &amp; private craft parties</h1>
    <p class="lead narrow">
      Celebrate by making something together. If you'd like a craft we don't
      currently offer, just ask: we have a huge network of local makers and
      would love to make it happen.
    </p>
    <div class="btn-row center">
      <a class="btn" href="#plan">Plan your party</a>
    </div>
  </header>

  <section class="section grid grid-3" aria-label="Types of party">
    {#each partyTypes as party (party.title)}
      <article class="framed">
        <div class="framed-inner">
          <h2 class="card-title">{party.title}</h2>
          <p>{party.text}</p>
          <p class="muted">{party.meta}</p>
        </div>
      </article>
    {/each}
  </section>

  <section class="section" aria-labelledby="gtk-title">
    <h2 id="gtk-title">Good to know</h2>
    <dl class="facts facts-4">
      {#each goodToKnow as item (item.label)}
        <div class="fact">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      {/each}
    </dl>
  </section>

  <section class="section" aria-labelledby="crafts-title">
    <h2 id="crafts-title">Choose your craft</h2>
    <ul class="chips">
      {#each crafts as craft (craft)}
        <li><span class="chip">{craft}</span></li>
      {/each}
      <li>
        <a class="chip chip-dashed" href="#plan">Something else? Ask us</a>
      </li>
    </ul>
  </section>

  <div class="section photo-row">
    {#each bottomPhotos as image (image.alt)}
      <img class="photo" src={image.src} alt={image.alt} loading="lazy" />
    {/each}
  </div>

  <section class="section panel" id="plan" aria-labelledby="plan-title">
    <h2 id="plan-title">Plan your party</h2>
    <p>Fill this in and we'll come back to you with dates and a price.</p>
    <EnquiryForm to={WORKSHOP_EMAIL} subject="Party / group booking enquiry">
      <div class="field">
        <label for="pp-type">Type of party</label>
        <select id="pp-type" name="type">
          <option>Children's party</option>
          <option>Hen party</option>
          <option>Birthday or get-together</option>
          <option>Work group or team day</option>
          <option>Something else</option>
        </select>
      </div>
      <div class="field">
        <label for="pp-craft">Craft</label>
        <select id="pp-craft" name="craft">
          <option>Not sure yet</option>
          {#each crafts as craft (craft)}
            <option>{craft}</option>
          {/each}
          <option>Something else</option>
        </select>
      </div>
      <div class="field">
        <label for="pp-date">Preferred date</label>
        <input id="pp-date" name="date" type="date" />
      </div>
      <div class="field">
        <label for="pp-people">Number of people</label>
        <input
          id="pp-people"
          name="people"
          type="number"
          min="1"
          max="20"
          inputmode="numeric"
        />
      </div>
      <div class="field">
        <label for="pp-ages">Ages (children's parties)</label>
        <input id="pp-ages" name="ages" />
      </div>
      <div class="field">
        <label for="pp-name">Your name</label>
        <input id="pp-name" name="name" autocomplete="name" required />
      </div>
      <div class="field">
        <label for="pp-email">Email</label>
        <input
          id="pp-email"
          name="email"
          type="email"
          autocomplete="email"
          required
        />
      </div>
      <div class="field">
        <label for="pp-phone">Phone (optional)</label>
        <input id="pp-phone" name="phone" type="tel" autocomplete="tel" />
      </div>
      <div class="field field-full">
        <label for="pp-notes">Anything else we should know?</label>
        <textarea id="pp-notes" name="notes"></textarea>
      </div>
      <div class="field field-full">
        <label for="pp-photos">Photos (optional)</label>
        <input
          id="pp-photos"
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
    margin-top: 2.5rem;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .framed-inner > :last-child {
    margin-bottom: 0;
  }

  @media (min-width: 600px) {
    .facts-4 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 900px) {
    .facts-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
