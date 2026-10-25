<script lang="ts">
  import { goto } from "$app/navigation";
  interface Props {
    width: string;
    cb: () => void;
    loading: boolean;
  }

  let { width, cb, loading = $bindable() }: Props = $props();

  let searchValue = $state("");

  // Focus on mount via an action rather than the `autofocus` attribute, which
  // trips the a11y linter.
  const focusOnMount = (node: HTMLInputElement) => {
    node.focus();
  };
</script>

<svelte:head>
  {#if loading}
    <link rel="stylesheet" href="/loading.css" />
  {/if}
</svelte:head>

<input
  data-testid="search-bar"
  use:focusOnMount
  type="search"
  style={width}
  bind:value={searchValue}
  onkeydown={async (e) => {
    if (e.key === "Enter") {
      loading = true;
      cb();
      await goto(
        `/shop/search?search-term=${encodeURIComponent(searchValue)}`, // eslint-disable-line svelte/no-navigation-without-resolve
        { replace: true },
      );
      loading = false;
      searchValue = "";
      loading = false;
    }
  }}
/>

<style>
  input {
    font-family: "Welcomehome5 Regular";
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 1px solid black;
  }
</style>
