<script lang="ts">
	import { goto } from '$app/navigation';
	export let width: string;

	let searchValue = '';
</script>

<input
	data-testid="search-bar"
	autofocus
	type="search"
	style={width}
	bind:value={searchValue}
	on:keydown={async (e) => {
	if (e.key === 'Enter') {
	await goto(`/shop/search?search-term=${encodeURIComponent(searchValue)}`);
			searchValue = '';
		}
	}}
/>

<style>
	input {
		font-family: 'WelcomeHome3 Regular';
		border: 0;
		outline: 0;
		background: transparent;
		border-bottom: 1px solid black;
	}
</style>
