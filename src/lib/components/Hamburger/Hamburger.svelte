<script lang="ts">
  import { goto } from "$app/navigation";
  import MobileClose from "../MobileClose/MobileClose.svelte";

  let toggleOpen = false;

  const toggleAndGo = (dest: string) => {
    toggleOpen = !toggleOpen;
    goto(dest);
  };
</script>

<MobileClose bind:bool={toggleOpen} cb={() => (toggleOpen = !toggleOpen)} />

{#if toggleOpen}
  <div class="menu">
    <button on:click={() => toggleAndGo("/shop")}> shop </button>
    <button on:click={() => toggleAndGo("/repairs")}> repairs </button>
    <button on:click={() => toggleAndGo("/classes")}> classes </button>
    <button on:click={() => toggleAndGo("/about")}> about </button>
    <button on:click={() => toggleAndGo("/contact")}> contact </button>
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
    font-family: "WelcomeHome3 Regular";
    font-size: 3.2em;
    cursor: pointer;
    margin: 30px;
  }

  button:focus {
    border-bottom: 3px solid orange;
  }
</style>
