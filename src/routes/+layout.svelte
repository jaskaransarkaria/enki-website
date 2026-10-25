<script lang="ts">
  import { page } from "$app/state";
  import { beforeNavigate } from "$app/navigation";
  import { updated, navigating } from "$app/state";
  import { SITE_URL } from "$lib/constants";
  import { jsonLdScript } from "$lib/utils/structuredData";
  import Header from "$lib/components/Header/Header.svelte";
  import Footer from "$lib/components/Footer/Footer.svelte";
  import BackToTop from "$lib/components/BackToTop/BackToTop.svelte";
  import aboutShopOneJpg from "$lib/assets/about_shop_1.jpg";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";
  import "../app.css";
  import { onMount } from "svelte";
  import LoadingSpinner from "$lib/components/LoadingSpinner/LoadingSpinner.svelte";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Store", "JewelryStore"],
    "@id": `${SITE_URL}/#business`,
    name: "Enki",
    description:
      "Independent gift shop and working jewellers in Kings Heath, Birmingham: cards, gifts, jewellery repairs, wedding ring classes and jewellery and craft workshops.",
    url: `${SITE_URL}/`,
    telephone: "+44 121 444 4453",
    email: "faith@enkionline.com",
    foundingDate: "2017",
    image: `${SITE_URL}${aboutShopOneJpg}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "30 High Street",
      addressLocality: "Kings Heath, Birmingham",
      postalCode: "B14 7JT",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.43718715965811,
      longitude: -1.892812886574717,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/enkionline/",
      "https://www.facebook.com/Enki-1665334930147391",
    ],
  };

  let checkAvif = $state(false);
  let loading = $state(false);

  // Turn the cursor into a busy spinner for product/category navigations.
  // The short delay avoids flicker on preloaded, near-instant navigations.
  const isCatalogNavigation = $derived(
    Boolean(
      navigating.to?.url.pathname.startsWith("/shop/product/") ||
      navigating.to?.url.pathname.startsWith("/shop/category/"),
    ),
  );

  $effect(() => {
    if (!isCatalogNavigation) {
      document.documentElement.classList.remove("navigating");
      return;
    }

    const timer = setTimeout(
      () => document.documentElement.classList.add("navigating"),
      200,
    );

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("navigating");
    };
  });

  onMount(() => {
    if ($isAvifSupported === null) {
      checkAvif = true;
    }
  });

  beforeNavigate(({ willUnload, to }) => {
    if (updated.current && !willUnload && to?.url) {
      location.href = to.url.href;
    }
  });
</script>

<svelte:head>
  <meta property="og:url" content={`${SITE_URL}${page.url.pathname}`} />
  <link rel="canonical" href={`${SITE_URL}${page.url.pathname}`} />
  <meta property="og:image" content={aboutShopOneJpg} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_GB" />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonLdScript(businessJsonLd)}
  <!-- Chrome, Firefox OS and Opera -->
  <meta name="theme-color" content="#008080" />
  <!-- Windows Phone -->
  <meta name="msapplication-navbutton-color" content="#008080" />
  <!-- iOS Safari -->
  <meta name="apple-mobile-web-app-status-bar-style" content="#4285f4" />
</svelte:head>

<div class="container">
  <Header bind:loading />
  <div class="header-block"></div>
  {#if loading}
    <div
      style=" display: flex; flex-wrap: wrap; align-items: center; justify-content: center; height: 90vh;"
    >
      <LoadingSpinner />
    </div>
  {:else}
    {@render children?.()}
  {/if}
  <BackToTop />
</div>
<Footer />
{#if checkAvif}
  <img
    class="avif-supported-check"
    alt="not visible and is used to check if your browser supports the avif format"
    src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="
    onload={() => {
      isAvifSupported.set(true);
    }}
    onerror={() => {
      isAvifSupported.set(false);
    }}
  />
{/if}

<style>
  .avif-supported-check {
    display: none;
  }

  .container {
    min-height: 100vh;
  }

  :global(html.navigating),
  :global(html.navigating *) {
    cursor: wait !important;
  }

  .header-block {
    top: 0%;
    height: 55px;
  }

  @media (min-width: 1280px) {
    .header-block {
      height: 65px;
    }
  }

  @media (min-width: 1960px) {
    .header-block {
      height: 75px;
    }
  }
</style>
