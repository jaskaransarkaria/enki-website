export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../../src/routes/__error.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/classes/index.svelte"),
	() => import("../../src/routes/classes/wedding-rings.svelte"),
	() => import("../../src/routes/classes/beginners.svelte"),
	() => import("../../src/routes/classes/payment/success.svelte"),
	() => import("../../src/routes/contact.svelte"),
	() => import("../../src/routes/repairs.svelte"),
	() => import("../../src/routes/about.svelte"),
	() => import("../../src/routes/shop/__layout.svelte"),
	() => import("../../src/routes/shop/index.svelte"),
	() => import("../../src/routes/shop/category/[category].svelte"),
	() => import("../../src/routes/shop/product/[product].svelte"),
	() => import("../../src/routes/shop/basket/index.svelte"),
	() => import("../../src/routes/shop/search/index.svelte"),
	() => import("../../src/routes/shop/tag/[type]-[tag].svelte")
];

export const dictionary = {
	"": [[0, 2], [1]],
	"classes": [[0, 3], [1]],
	"classes/wedding-rings": [[0, 4], [1]],
	"classes/beginners": [[0, 5], [1]],
	"classes/payment/success": [[0, 6], [1]],
	"contact": [[0, 7], [1]],
	"repairs": [[0, 8], [1]],
	"about": [[0, 9], [1]],
	"shop": [[0, 10, 11], [1]],
	"shop/category/[category]": [[0, 10, 12], [1]],
	"shop/product/[product]": [[0, 10, 13], [1]],
	"shop/basket": [[0, 10, 14], [1]],
	"shop/search": [[0, 10, 15], [1]],
	"shop/tag/[type]-[tag]": [[0, 10, 16], [1]]
};