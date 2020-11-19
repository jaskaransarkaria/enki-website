<script lang="ts">
  import Router from '@roxi//routify/runtime/Router.svelte';
  import { routes } from '../.routify/routes';
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <Router {routes} />
</main>
