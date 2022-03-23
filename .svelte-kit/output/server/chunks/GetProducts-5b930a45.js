import { c as create_ssr_component, a as subscribe, b as add_attribute } from "./index-fdb1bd20.js";
import { w as writable } from "./index-951b6248.js";
import "fp-ts/lib/function.js";
import "fp-ts/lib/TaskEither.js";
import "fp-ts/lib/Task.js";
const products = writable([]);
const GetProducts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $products, $$unsubscribe_products;
  $$unsubscribe_products = subscribe(products, (value) => $products = value);
  $$unsubscribe_products();
  return `${$$result.head += `${$products && $products.length === 0 ? `<link rel="${"preload"}" as="${"fetch"}"${add_attribute("href", `${"http://localhost:8080"}/get-all-products`, 0)} crossorigin="${"anonymous"}" data-svelte="svelte-cs8iot">` : ``}`, ""}`;
});
export { GetProducts as G, products as p };
