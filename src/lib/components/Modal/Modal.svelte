<script lang="ts">
  import { fade } from "svelte/transition";
  import MobileClose from "$lib/components/MobileClose/MobileClose.svelte";
  import { clickOutside } from "$lib/utils/clickOutside";

  export let isMobile: boolean;
  export let showModal: boolean;
  export let visible = 0;
  export let cssClass = "img-view";
  export let containerClass = "";
  export let showFullScreen = false;
  export let onCloseFn = () => {};
  export let showCross = false;

  const handleWindowKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && showModal) {
      onCloseFn();
      showModal = false;
      visible = 0;
    }
  };

  $: outerHeight = 0;
  $: outerWidth = 0;
  $: innerWidth = 0;
</script>

<svelte:window
  bind:outerHeight
  bind:outerWidth
  bind:innerWidth
  on:keydown={handleWindowKeyDown}
/>

{#if showModal}
  <div
    class={containerClass ||
      (isMobile ? "mobile-show-modal" : "desktop-show-modal")}
    data-testid={isMobile ? "mobile-show-modal" : "desktop-show-modal"}
    in:fade={{ duration: 500 }}
    out:fade={{ duration: 500 }}
  >
    <div
      class={cssClass}
      use:clickOutside={{
        enabled: showModal && visible > 1,
        cb: () => {
          onCloseFn();
          showModal = false;
          visible = 0;
        },
      }}
    >
      {#if isMobile || showCross}
        <MobileClose
          cb={() => {
            onCloseFn();
            showModal = false;
            visible = 0;
          }}
          bind:bool={showModal}
          positionOverride="top: 1%; left: 2%"
        />
        <slot />
      {:else}
        <div class={showFullScreen ? "full-screen-img-view" : ""}>
          <slot />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .img-view {
    position: relative;
    display: flex;
    background: white;
    justify-content: center;
    box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
    border-radius: 0.25em;
    margin: 4%;
    height: 100%;
    width: 85%;
    top: 50%;
    align-items: center;
    transform: translateY(-50%);
  }

  .home-modal {
    position: relative;
    display: flex;
    background: white;
    justify-content: center;
    box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
    border-radius: 0.25em;
    margin: 4%;
    padding: 4%;
    height: 40%;
    width: 100%;
    top: 28%;
    align-items: center;
    transform: translateY(-50%);
  }

  .home-mobile-show-modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    z-index: 101;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(2.5px);
  }

  .mobile-show-modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    z-index: 101;
    height: 50vh;
    width: 100vw;
    backdrop-filter: blur(2.5px);
  }

  .desktop-show-modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    z-index: 101;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(2.5px);
  }

  .full-screen-img-view {
    display: flex;
    width: 65%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 360px) {
    .home-modal {
      position: relative;
      display: flex;
      background: white;
      justify-content: center;
      box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
      border-radius: 0.25em;
      margin: 4%;
      padding: 4%;
      height: 50%;
      width: 100%;
      top: 28%;
      align-items: center;
      transform: translateY(-50%);
    }
  }

  @media (min-width: 700px) {
    .home-mobile-show-modal {
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 50%;
      transform: translateY(-50%);
      z-index: 101;
      height: 100vh;
      width: 100vw;
      backdrop-filter: blur(2.5px);
    }

    .home-modal {
      position: relative;
      display: flex;
      background: white;
      justify-content: center;
      box-shadow: 0 3px 20px rgb(0 0 0 / 0.2);
      border-radius: 0.25em;
      margin: 4%;
      padding: 4%;
      height: 35%;
      width: 100%;
      top: 28%;
      align-items: center;
      transform: translateY(-50%);
    }
  }

  @media (min-width: 960px) {
    .home-modal {
      width: 48vw;
    }
  }

  @media (min-width: 1280px) {
    .full-screen {
      position: absolute;
    }

    .img-view {
      width: 65vw;
      height: 40vw;
      top: 40%;
    }
  }

  @media (min-width: 1600px) {
    .home-modal {
      width: 600px;
      height: 400px;
    }
  }
</style>
