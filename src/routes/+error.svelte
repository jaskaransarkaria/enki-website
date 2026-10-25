<script lang="ts">
  import { page } from "$app/state";
  import notFoundImg from "#lib/assets/404.png";
</script>

<svelte:head>
  <title
    >{page.status === 404
      ? "Enki - Page not found"
      : "Enki - Something went wrong"}</title
  >
  <meta name="robots" content="noindex, follow" />
</svelte:head>

<div>
  <img
    src={notFoundImg}
    alt="scissors cutting string representing a 404 page not found"
  />
</div>

<style>
  div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3em;
  }

  img {
    position: absolute;
    max-width: 100%;
  }
</style>
