<script lang="ts">
  // import Swiper core and required modules
  import { Pagination, A11y, Keyboard, Zoom, Mousewheel } from "swiper";

  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";

  import comingSoon from "$lib/assets/coming_soon.png";

  export let imgArr: { src: string; alt: string }[];
  export let setImgWidth = false;
  export let fullScreen = false;
</script>

{#if imgArr.length > 1}
  <div class="swiper" style:width={setImgWidth ? setImgWidth + "px" : "100%"}>
    <Swiper
      modules={[Pagination, A11y, Keyboard, Zoom, Mousewheel]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true, el: ".custom-pagination-div" }}
      keyboard={{ enabled: true }}
      grabCursor={true}
      autoHeight={true}
      centeredSlides={true}
      zoom={setImgWidth ? true : false}
      mousewheel={setImgWidth ? true : false}
    >
      {#each imgArr as { src, alt }, idx ("main" + idx)}
        <SwiperSlide>
          <div>
            <img
              {src}
              {alt}
              data-testid="swipe-img"
              class={fullScreen ? "full-screen" : ""}
            />
            <div class="custom-pagination-div" />
          </div>
        </SwiperSlide>
      {/each}
    </Swiper>
  </div>
{:else}
  <div class="single-img-container">
    <img
      src={imgArr[0].src}
      alt={imgArr[0].alt}
      on:error={() => {
        if (imgArr[0].src != comingSoon) {
          imgArr[0].src = comingSoon;
        }
      }}
      class={fullScreen ? "full-screen" : ""}
    />
  </div>
{/if}

<style>
  .swiper {
    max-width: 100%;
    text-align: center;
  }

  .full-screen {
    max-height: 33vw;
  }

  img {
    max-width: 80%;
    max-height: 95%;
    animation: fadeIn 0.6s;
  }

  .single-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100%;
  }

  .custom-pagination-div {
    display: flex;
    justify-content: center;
    height: 100%;
  }

  :global(.swiper-pagination-bullet-active) {
    background-color: #ff6600;
    opacity: 1;
  }

  @media (min-width: 1280px) {
    .swiper {
      max-width: 80%;
    }
  }
</style>
