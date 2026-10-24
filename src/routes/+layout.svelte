<script lang="ts">
  import { page } from "$app/state";
import { beforeNavigate } from "$app/navigation";
import { updated, navigating } from "$app/state";
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

  let checkAvif = $state(false);
  let loading = $state(false);

  // Only show the navigation spinner for product/category clicks, and only
  // after a short delay so preloaded, near-instant navigations don't flicker.
  const isCatalogNavigation = $derived(
    Boolean(
      navigating.to?.url.pathname.startsWith("/shop/product/") ||
        navigating.to?.url.pathname.startsWith("/shop/category/"),
    ),
  );
  let showNavigationSpinner = $state(false);

  $effect(() => {
    if (!isCatalogNavigation) {
      showNavigationSpinner = false;
      return;
    }

    const timer = setTimeout(() => (showNavigationSpinner = true), 150);

    return () => clearTimeout(timer);
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
  <meta property="og:title" content="Enki" />
  <meta property="og:url" content="https://enkionline.com" />
  <meta property="og:image" content={aboutShopOneJpg} />
  <meta property="og:type" content="website" />
  <meta
    property="og:description"
    content="Independent jewellers and craft gallery -- Kings Heath Birmingham"
  />
  <meta property="og:locale" content="en_GB" />
  <!-- Chrome, Firefox OS and Opera -->
  <meta name="theme-color" content="#008080" />
  <!-- Windows Phone -->
  <meta name="msapplication-navbutton-color" content="#008080" />
  <!-- iOS Safari -->
  <meta name="apple-mobile-web-app-status-bar-style" content="#4285f4" />
</svelte:head>

<div class="container">
  {#if showNavigationSpinner}
    <div class="navigation-overlay" data-testid="navigation-spinner">
      <LoadingSpinner />
    </div>
  {/if}
  <Header whitelistedUserAgent={page.data.whitelistedUserAgent} bind:loading />
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

  .navigation-overlay {
    position: fixed;
    inset: 0;
    z-index: 98;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(255 255 255 / 0.7);
    pointer-events: none;
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
