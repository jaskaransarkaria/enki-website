<script lang="ts">
  import { onMount } from "svelte";
  // import Swiper core and required modules
  import { Pagination, A11y, Keyboard } from "swiper";

  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";

  import type { Product } from "$lib/types/product";

  export let product: Product;
  export let setImgWidth = "";
</script>

{#if product?.ProductImages.length > 1}
  <div class="swiper">
    <Swiper
      modules={[Pagination, A11y, Keyboard]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      keyboard={{ enabled: true }}
      effect={"cards"}
      grabCursor={true}
      on:slideChange={() => console.log("slide change")}
      on:swiper={(e) => console.log(e.detail[0])}
    >
      {#each product.ProductImages as _, idx ("main" + idx)}
        <SwiperSlide>
          <img
            class={setImgWidth ? "full-screen-view" : ""}
            src={`https://enki.imgix.net/${product.Id}-${idx}?q=100${setImgWidth}`}
            alt={`${product.Name} image ${idx}`}
          />
        </SwiperSlide>
      {/each}
    </Swiper>
  </div>
{:else}
  <section>
    <img
      src={`https://enki.imgix.net/${product.Id}-0?q=100`}
      alt={`${product.Name} image 1`}
    />
  </section>
{/if}

<style>
  .swiper {
    height: auto;
    width: 100%;
  }

  :global(.swiper-pagination-bullet-active) {
    background-color: #ff6600;
    opacity: 1;
  }
</style>
