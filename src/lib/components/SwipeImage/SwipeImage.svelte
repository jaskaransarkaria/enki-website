<script lang="ts">
  // import Swiper core and required modules
  import { Pagination, A11y, Keyboard, Zoom, Mousewheel } from "swiper";

  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";

  export let imgArr: { src: string; alt: string }[];
  export let setImgWidth = false;
  export let fullScreen = false;
</script>

{#if imgArr.length > 1}
  <div
    class="swiper"
    style="width: {setImgWidth ? setImgWidth + 'px' : '100%'}"
  >
    <Swiper
      modules={[Pagination, A11y, Keyboard, Zoom, Mousewheel]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true, el: ".custom-pagination-div" }}
      keyboard={{ enabled: true }}
      grabCursor={true}
      centeredSlides={true}
      autoHeight={true}
      zoom={setImgWidth ? true : false}
      mousewheel={setImgWidth ? true : false}
    >
      {#each imgArr as img, idx ("main" + idx)}
        <SwiperSlide>
          <img
            src={img.src}
            alt={img.alt}
            data-testid="swipe-img"
            style={fullScreen ? "" : "cursor: pointer"}
          />
          <div class="custom-pagination-div" />
        </SwiperSlide>
      {/each}
    </Swiper>
  </div>
{:else}
  <img
    src={imgArr[0].src}
    alt={imgArr[0].alt}
    style={fullScreen ? "" : "cursor: pointer"}
  />
{/if}

<style>
  .swiper {
    max-width: 100%;
    text-align: center;
  }

  img {
    max-width: 90%;
    height: 90%;
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
