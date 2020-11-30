<script lang="ts">
  import Router from '@roxi/routify/runtime/Router.svelte';
  import { routes } from '../.routify/routes';
</script>

<style>
  main {
    display: flex;
    justify-content: center;
    text-align: center;
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
