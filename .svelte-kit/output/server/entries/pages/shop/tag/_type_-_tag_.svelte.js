import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/index-fdb1bd20.js";
import { d as refreshProductsFromServer } from "../../../../chunks/categories-699c3bd3.js";
import { p as page } from "../../../../chunks/stores-00321fe1.js";
import { P as ProductView } from "../../../../chunks/ProductView-28599078.js";
import { B as Breadcrumbs } from "../../../../chunks/Breadcrumbs-fa32fbcd.js";
import "fp-ts/lib/function.js";
import "fp-ts/lib/TaskEither.js";
import "fp-ts/lib/Task.js";
import "../../../../chunks/index-951b6248.js";
import "../../../../chunks/env-14926626.js";
import "lodash-es";
import "../../../../chunks/gridCalc-2d8e7fa8.js";
import "../../../../chunks/SingleProduct-101de88f.js";
import "../../../../chunks/basket-ca587022.js";
async function load({ fetch, params }) {
  const result = await refreshProductsFromServer(`${"http://localhost:8080"}/get-all-products`, fetch);
  const filteredResult = result.filter((obj) => obj.ProductTags.filter((tag) => tag.Name.toLowerCase() === `${params.type}-${params.tag}`).length ? true : false);
  return { props: { data: filteredResult } };
}
const prerender = true;
const U5Btypeu5D_u5Btagu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data = [] } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  return `${validate_component(Breadcrumbs, "Breadcrumbs").$$render($$result, {
    selectedCategoryId: parseInt($page.url.searchParams.get("catid"), 10),
    extraCrumbs: [
      {
        Name: $page.params.tag,
        Id: parseInt($page.url.searchParams.get("tagid"), 0),
        tagUrl: $page.url.toString(),
        params: `?catId=${$page.url.searchParams.get("catid")}&tagid=${$page.url.searchParams.get("tagid")}`
      }
    ]
  }, {}, {})}
${validate_component(ProductView, "ProductView").$$render($$result, { productArr: data }, {}, {})}`;
});
export { U5Btypeu5D_u5Btagu5D as default, load, prerender };
