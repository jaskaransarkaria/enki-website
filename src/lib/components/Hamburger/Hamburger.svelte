<script lang="ts">
  import { goto } from "$app/navigation";
  import MobileClose from "../MobileClose/MobileClose.svelte";

  let toggleOpen = $state(false);

  const toggleAndGo = (dest: string) => {
    toggleOpen = !toggleOpen;
    goto(dest); // eslint-disable-line svelte/no-navigation-without-resolve
  };
</script>

<MobileClose bind:bool={toggleOpen} cb={() => (toggleOpen = !toggleOpen)} />

{#if toggleOpen}
  <div class="menu">
    <button onclick={() => toggleAndGo("/shop")}> shop </button>
    <button
      onclick={() => toggleAndGo("/shop/category/CXWG77NR7TPXXQSZD3QVPLHS")}
    >
      gift guide
    </button>
    <button onclick={() => toggleAndGo("/repairs")}> repairs </button>
    <button onclick={() => toggleAndGo("/workshops")}> workshops </button>
    <button onclick={() => toggleAndGo("/about")}> about </button>
    <button onclick={() => toggleAndGo("/contact")}> contact </button>
  </div>
{/if}

<style>
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    z-index: 100;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    all: unset;
    font-family: "Welcomehome5 Regular";
    font-size: 3em;
    cursor: pointer;
    margin: 30px;
  }

  button:focus {
    border-bottom: 3px solid orange;
  }
</style>
