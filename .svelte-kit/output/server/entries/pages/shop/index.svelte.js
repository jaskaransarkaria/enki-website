import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../chunks/index-fdb1bd20.js";
import { r as refreshCategoriesFromServer } from "../../../chunks/requests-1b4d1f5b.js";
import { H as HexGrid } from "../../../chunks/HexGrid-c9d83680.js";
import { p as page } from "../../../chunks/stores-00321fe1.js";
import "fp-ts/lib/function.js";
import "fp-ts/lib/TaskEither.js";
import "fp-ts/lib/Task.js";
import "../../../chunks/gridCalc-2d8e7fa8.js";
const orderCategories = (resp) => resp.sort((a, b) => a.Name < b.Name ? -1 : 1);
async function load({ fetch }) {
  const result = await refreshCategoriesFromServer(`${"http://localhost:8080"}/categories`, fetch);
  return {
    props: { data: orderCategories([...result]) }
  };
}
const prerender = true;
const Shop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  const categoryFn = (category) => `${$page.url}/category/${category.Id}`;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  return `${validate_component(HexGrid, "HexGrid").$$render($$result, { data, categoryFn }, {}, {})}`;
});
export { Shop as default, load, prerender };
