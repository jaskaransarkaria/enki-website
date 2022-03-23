import { c as create_ssr_component, a as subscribe, b as add_attribute, v as validate_component } from "../../../chunks/index-fdb1bd20.js";
import { r as readonlyAllCategories, a as refreshCategoriesFromServer } from "../../../chunks/categories-699c3bd3.js";
import { p as page } from "../../../chunks/stores-00321fe1.js";
import { H as HexGrid } from "../../../chunks/HexGrid-c9d83680.js";
import "fp-ts/lib/function.js";
import "fp-ts/lib/TaskEither.js";
import "fp-ts/lib/Task.js";
import "../../../chunks/index-951b6248.js";
import "../../../chunks/gridCalc-2d8e7fa8.js";
const RootCategories = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $readonlyAllCategories, $$unsubscribe_readonlyAllCategories;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_readonlyAllCategories = subscribe(readonlyAllCategories, (value) => $readonlyAllCategories = value);
  let { data } = $$props;
  const categoryFn = (category) => `${$page.url}/category/${category.Id}`;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  $$unsubscribe_readonlyAllCategories();
  return `${$$result.head += `${$readonlyAllCategories && $readonlyAllCategories.length === 0 ? `<link rel="${"preload"}" as="${"fetch"}"${add_attribute("href", `${"http://localhost:8080"}/categories`, 0)} crossorigin="${"anonymous"}" data-svelte="svelte-32o316">` : ``}`, ""}

${validate_component(HexGrid, "HexGrid").$$render($$result, { data, categoryFn }, {}, {})}`;
});
const orderCategories = (resp) => resp.sort((a, b) => a.Name < b.Name ? -1 : 1);
async function load({ fetch }) {
  const result = await refreshCategoriesFromServer(`${"http://localhost:8080"}/categories`, fetch);
  return {
    props: { data: orderCategories([...result]) }
  };
}
const prerender = true;
const Shop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(RootCategories, "RootCategories").$$render($$result, { data }, {}, {})}`;
});
export { Shop as default, load, prerender };
