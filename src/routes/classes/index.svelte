<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
</script>

<div class="container">
	<div class="class-pics">
		<button class="class-button">
			<img
				in:fade={{ duration: 600 }}
				src="https://enki.imgix.net/group_portrait.png?auto=format,compress"
				alt="carton button with a hammer"
				on:click={() => goto('classes/beginners')}
			/>
		</button>
		<button class="class-button">
			<img
				in:fade={{ duration: 600 }}
				src="https://enki.imgix.net/wedding_portrait.png?auto=format,compress"
				alt="cartoon button with a boquet of flowers"
				on:click={() => goto('classes/wedding-rings')}
			/>
		</button>
		<div />
	</div>
</div>

<style>
	.container {
		display: flex;
		min-height: 100%;
		width: 100vw;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 5%;
	}

	.class-pics {
		display: flex;
		flex-direction: column;
		margin-bottom: 10%;
	}

	.class-button {
		border: none;
		background: none;
	}

	.class-button:hover {
		cursor: pointer;
	}

	.class-button > img {
		width: 80%;
		padding: 5px;
	}

	@media (min-width: 960px) {
		.class-pics {
			flex-direction: row;
			margin-bottom: 2%;
		}
	}

	@media (min-width: 2200px) {
		.class-pics {
			width: 50%;
			justify-content: space-evenly;
		}
		.class-button > img {
			width: 100%;
			padding: 5px;
			margin: 10px;
		}
	}
</style>
