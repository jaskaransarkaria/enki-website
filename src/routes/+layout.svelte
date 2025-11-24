<script lang="ts">
  import { page } from "$app/state";
  import Header from "$lib/components/Header/Header.svelte";
  import Footer from "$lib/components/Footer/Footer.svelte";
  import BackToTop from "$lib/components/BackToTop/BackToTop.svelte";
  import aboutShopOneJpg from "$lib/assets/about_shop_1.jpg";
  import { isAvifSupported } from "$lib/stores/isAvifSupported";
  import "../app.css";
  import { onMount } from "svelte";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  let checkAvif = $state(false);

  onMount(() => {
    if ($isAvifSupported === null) {
      checkAvif = true;
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
  <Header whitelistedUserAgent={page.data.whitelistedUserAgent} />
  <div class="header-block"></div>
  {@render children?.()}
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
