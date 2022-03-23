import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-fdb1bd20.js";
import { c as refreshProductsFromServer } from "../../../../chunks/requests-1b4d1f5b.js";
import { S as SingleProduct } from "../../../../chunks/SingleProduct-101de88f.js";
import { B as Breadcrumbs } from "../../../../chunks/Breadcrumbs-5b6e6191.js";
import "fp-ts/lib/function.js";
import "fp-ts/lib/TaskEither.js";
import "fp-ts/lib/Task.js";
import "../../../../chunks/basket-ca587022.js";
import "../../../../chunks/index-951b6248.js";
var _product__svelte_svelte_type_style_lang = "";
const css = {
  code: "div.svelte-ks28li{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:3em}",
  map: null
};
async function load({ fetch, params }) {
  const result = await refreshProductsFromServer(`${"http://localhost:8080"}/product?id=${params.product}`, fetch);
  return { props: { productToShow: result } };
}
const prerender = true;
const U5Bproductu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { productToShow = [] } = $$props;
  if ($$props.productToShow === void 0 && $$bindings.productToShow && productToShow !== void 0)
    $$bindings.productToShow(productToShow);
  $$result.css.add(css);
  return `${productToShow.length ? `${validate_component(Breadcrumbs, "Breadcrumbs").$$render($$result, {
    selectedCategoryId: productToShow[0].CategoryId
  }, {}, {})}
	<div class="${"svelte-ks28li"}">${validate_component(SingleProduct, "SingleProduct").$$render($$result, {
    product: productToShow[0],
    showDetailedView: true
  }, {}, {})}</div>` : ``}`;
});
export { U5Bproductu5D as default, load, prerender };
