<script lang="ts">
  import Header from '@/components/Header/Header.svelte';
  import Footer from '@/components/Footer/Footer.svelte';
</script>

<div class="container">
  <Header />
  <div class="header-block" />
  <slot scoped={{ name: 'world' }} />
</div>
<Footer />

<style>
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
