<script lang="ts">
  import PrivateParties from "#lib/components/Svg/PrivateParties.svelte";
  import WeddingRings from "#lib/components/Svg/WeddingRingsCharlotte.svelte";
  import ScheduledClasses from "#lib/components/Svg/ScheduledClasses.svelte";
  import { jsonLdScript, serviceJsonLd } from "#lib/utils/structuredData.js";
  import { SITE_URL } from "#lib/constants.js";

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

<div class="container">
  <ScheduledClasses />
  <WeddingRings />
  <PrivateParties />
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    min-height: 100vh;
  }
</style>
