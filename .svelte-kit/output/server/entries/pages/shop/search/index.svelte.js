import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape } from "../../../../chunks/index-fdb1bd20.js";
import { p as page } from "../../../../chunks/stores-00321fe1.js";
import { G as GetProducts, p as products } from "../../../../chunks/GetProducts-5b930a45.js";
import { P as ProductView } from "../../../../chunks/ProductView-28599078.js";
import "../../../../chunks/index-951b6248.js";
import "fp-ts/lib/function.js";
import "fp-ts/lib/TaskEither.js";
import "fp-ts/lib/Task.js";
import "../../../../chunks/env-14926626.js";
import "lodash-es";
import "../../../../chunks/gridCalc-2d8e7fa8.js";
import "../../../../chunks/SingleProduct-101de88f.js";
import "../../../../chunks/basket-ca587022.js";
const searchProducts = (prodToFind, productsArr) => productsArr.filter((obj) => "Name" in obj ? obj?.Name.toLowerCase().match(prodToFind) : false);
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-1llibpk{margin-top:40%;text-align:center;font-family:'Caviar Dreams'}@media(min-width: 360px){h2.svelte-1llibpk{margin-top:37.5%}}@media(min-width: 700px){h2.svelte-1llibpk{margin-top:12%}}@media(min-width: 1600px){h2.svelte-1llibpk{margin-top:6%}}@media(min-width: 1960px){h2.svelte-1llibpk{margin-top:6%}}",
  map: null
};
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $products, $$unsubscribe_products;
  let $page, $$unsubscribe_page;
  $$unsubscribe_products = subscribe(products, (value) => $products = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let data = [];
  let reg;
  const prerender = true;
  if ($$props.prerender === void 0 && $$bindings.prerender && prerender !== void 0)
    $$bindings.prerender(prerender);
  $$result.css.add(css);
  reg = new RegExp(`\\b${decodeURIComponent($page.url.searchParams.get("search-term"))}`, "i");
  {
    if ($page.url.searchParams.get("search-term") && $products.length) {
      data = searchProducts(reg, $products);
    }
  }
  $$unsubscribe_products();
  $$unsubscribe_page();
  return `${validate_component(GetProducts, "GetProducts").$$render($$result, {}, {}, {})}
${data.length ? `<h2 class="${"svelte-1llibpk"}">we found ${escape(data.length)} results for &quot;${escape(decodeURIComponent($page.url.searchParams.get("search-term")))}&quot;
  </h2>
  ${validate_component(ProductView, "ProductView").$$render($$result, { productArr: data }, {}, {})}` : ``}`;
});
export { Search as default };
