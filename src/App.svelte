<script lang="ts">
  import Router from '@roxi/routify/runtime/Router.svelte';
  import { routes } from '../.routify/routes';
</script>

<main>
  <Router {routes} />
</main>
