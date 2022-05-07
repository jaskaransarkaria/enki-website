<script lang="ts">
  // import Swiper core and required modules
  import { Pagination, A11y, Keyboard, Zoom, Mousewheel } from "swiper";

  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";

  import type { Product } from "$lib/types/product";

  let swipeImgArr: HTMLImageElement[] = [];

  export let product: Product;
  export let setImgWidth: number;
</script>

{#if product?.ProductImages.length > 1}
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
      {#each product.ProductImages as _, idx ("main" + idx)}
        <SwiperSlide>
          <img
            src={`https://enki.imgix.net/${product.Id}-${idx}?q=100${
              setImgWidth ? `&w=${setImgWidth}` : ""
            }`}
            alt={`${product.Name} image ${idx}`}
            bind:this={swipeImgArr[idx]}
          />
          <div class="custom-pagination-div" />
        </SwiperSlide>
      {/each}
    </Swiper>
  </div>
{:else}
  <img
    src={`https://enki.imgix.net/${product.Id}-0?q=100`}
    alt={`${product.Name} image 1`}
  />
{/if}

<style>
  .swiper {
    max-width: 100%;
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

  img {
    max-width: 90%;
    height: auto;
  }

  @media (min-width: 1280px) {
    .swiper {
      max-width: 80%;
    }
  }
</style>
