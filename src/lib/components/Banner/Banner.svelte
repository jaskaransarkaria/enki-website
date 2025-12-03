<script lang="ts">
  import { fade } from "svelte/transition";
  import { page } from "$app/stores";
  interface Props {
    hasProducts?: boolean;
  }

  let { hasProducts = false }: Props = $props();

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();

  const isXmas = currentMonth === 11;
</script>

{#if hasProducts && !$page.url.toString().match("32TE2EITCQ6KE4HQ34ORK6V5")}
  <div in:fade={{ duration: 600 }} class={isXmas ? "xmasDiv" : ""}>
    <p class="pulse">
      Gift wrapping service click <a
        data-sveltekit-preload-data
        href="/shop/category/32TE2EITCQ6KE4HQ34ORK6V5">here!</a
      >
    </p>
    {#if isXmas}
      <p>***CHRISTMAS SHIPPING DEADLINES*** Standard - 17th, Special - 20th</p>
    {/if}
    <p class="free-shipping">Free UK shipping over £40</p>
  </div>
{/if}

<style>
  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    background-color: var(--accent-color);
    margin-bottom: 1.5em;
    box-shadow: 1px 1.5px 4px #888888;
    text-align: center;
  }

  .xmasDiv {
    height: 60px;
  }

  .xmasDiv p {
    line-height: 1;
    font-size: 0.75em;
  }

  div p {
    font-family: "Caviar Dreams";
    font-weight: bold;
    margin-left: 0.5em;
    margin-right: 0.5em;
    font-size: 0.6em;
    color: white;
  }

  a {
    color: white;
    cursor: pointer;
  }

  .pulse {
    animation-name: pulse_animation;
    animation-duration: 5000ms;
    transform-origin: 70% 70%;
    animation-iteration-count: 1;
    animation-timing-function: linear;
  }

  @media (min-width: 360px) {
    div p {
      line-height: 0;
      font-size: 0.7em;
    }

    .xmasDiv {
      height: 80px;
    }

    .xmasDiv p {
      line-height: 1;
      font-size: 0.9em;
    }
  }

  @media (min-width: 500px) {
    .xmasDiv {
      height: 50px;
    }
  }

  @media (min-width: 960px) {
    .xmasDiv {
      height: 30px;
    }

    .xmasDiv p {
      line-height: 0;
    }

    div p {
      font-size: 1em;
    }
  }

  @keyframes pulse_animation {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1);
    }
    40% {
      transform: scale(1.08);
    }
    50% {
      transform: scale(1);
    }
    60% {
      transform: scale(1);
    }
    70% {
      transform: scale(1.05);
    }
    80% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
