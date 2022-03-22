<script lang="ts">
	import { Swipe, SwipeItem } from 'svelte-swipe';
	import { fade } from 'svelte/transition';

	import type { Product } from '$lib/types/product';

	export let product: Product;
	export let activeItem = 0;
	export let SwipeComp: any;

	const swipeConfig = {
		autoplay: false,
		delay: 600,
		showIndicators: false,
		transitionDuration: 500,
		defaultIndex: activeItem
	};

	$: clientHeight = 0;
	$: outerWidth = 0;
	$: outerHeight = 0;
</script>

<svelte:window bind:outerWidth bind:outerHeight />
<div style="height: {clientHeight}px" class="swipe-holder">
	{#if product}
		<Swipe bind:active_item={activeItem} bind:this={SwipeComp} {...swipeConfig}>
			{#each product.ProductImages as _, idx ('main' + idx)}
				<SwipeItem allow_dynamic_height={true}>
					<section bind:clientHeight>
						<img
							in:fade={{ duration: 600 }}
							src={`https://enki.imgix.net/${product.Id}-${idx}?q=100&fit=clip&w=${outerWidth}&h=${
								outerHeight / 3
							}`}
							alt={`${product.Name} image ${idx + 1}`}
						/>
					</section>
				</SwipeItem>
			{/each}
		</Swipe>
	{/if}
</div>

<style>
	img {
		height: auto;
		max-width: 100%;
	}

	.swipe-holder {
		width: 100%;
		cursor: grab;
	}

	@media (min-width: 960px) {
	}

	@media (min-width: 1280px) {
	}

	@media (min-width: 1600px) {
	}

	@media (min-width: 2000px) {
	}
</style>
