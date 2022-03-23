import { c as create_ssr_component, e as escape, v as validate_component, n as null_to_empty, k as each } from "./index-fdb1bd20.js";
import { b as browser } from "./env-14926626.js";
import { groupBy } from "lodash-es";
import { a as calcShowGrid } from "./gridCalc-2d8e7fa8.js";
import { S as SingleProduct } from "./SingleProduct-101de88f.js";
var Switch_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "h3.svelte-1gz8rnp.svelte-1gz8rnp{font-family:'Caviar Dreams'}.switch.svelte-1gz8rnp.svelte-1gz8rnp{position:relative;display:inline-block;width:60px;height:34px}.switch.svelte-1gz8rnp input.svelte-1gz8rnp{opacity:0;width:0;height:0}.slider.svelte-1gz8rnp.svelte-1gz8rnp{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:0.4s;transition:0.4s}.slider.svelte-1gz8rnp.svelte-1gz8rnp:before{position:absolute;content:'';height:26px;width:26px;left:4px;bottom:4px;background-color:white;-webkit-transition:0.4s;transition:0.4s}input.svelte-1gz8rnp:checked+.slider.svelte-1gz8rnp{background-color:black}input.svelte-1gz8rnp:focus+.slider.svelte-1gz8rnp{box-shadow:0 0 1px black}input.svelte-1gz8rnp:checked+.slider.svelte-1gz8rnp:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(26px)}.slider.round.svelte-1gz8rnp.svelte-1gz8rnp{border-radius:34px}.slider.round.svelte-1gz8rnp.svelte-1gz8rnp:before{border-radius:50%}",
  map: null
};
const Switch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active } = $$props;
  let { msg } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.msg === void 0 && $$bindings.msg && msg !== void 0)
    $$bindings.msg(msg);
  $$result.css.add(css$1);
  return `<h3 class="${"svelte-1gz8rnp"}">${escape(msg)}</h3>
<label class="${"switch svelte-1gz8rnp"}"><input type="${"checkbox"}" class="${"svelte-1gz8rnp"}">
	<span class="${"slider round svelte-1gz8rnp"}"></span>
</label>`;
});
var ProductView_svelte_svelte_type_style_lang = "";
const css = {
  code: ".switch-container.svelte-jwwlkx{display:flex;justify-content:flex-end}.products-container.svelte-jwwlkx{display:grid;grid-auto-rows:18em;grid-template-columns:1fr;align-items:center}.detailed-products-container.svelte-jwwlkx{display:flex;width:100%;justify-content:center;align-items:center}@media(min-width: 360px){.products-container.svelte-jwwlkx{grid-auto-rows:12em;grid-template-columns:1fr 1fr;margin:10px}}@media(min-width: 550px){.products-container.svelte-jwwlkx{grid-template-columns:1fr 1fr;margin:25px}}@media(min-width: 700px){.products-container.svelte-jwwlkx{grid-auto-rows:22em;grid-template-columns:1fr 1fr;margin:35px}}@media(min-width: 960px){.products-container.svelte-jwwlkx{grid-auto-rows:32em}}@media(min-width: 1280px){.products-container.svelte-jwwlkx{grid-auto-rows:28em;grid-template-columns:1fr 1fr 1fr}}@media(min-width: 1600px){.products-container.svelte-jwwlkx{grid-template-columns:1fr 1fr 1fr 1fr}}@media(min-width: 2000px){.products-container.svelte-jwwlkx{grid-auto-rows:30em;grid-template-columns:1fr 1fr 1fr 1fr}}@media(min-width: 2400px){.products-container.svelte-jwwlkx{grid-auto-rows:32em;grid-template-columns:1fr 1fr 1fr 1fr 1fr}}",
  map: null
};
const ProductView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let variantCategoryIds;
  let typedVariantCategories;
  let typedNonVariantProductArr;
  let collatedArray;
  let sortedCollatedArray;
  let { productArr = [] } = $$props;
  let { variantCategories = [] } = $$props;
  let { showDetailedView = false } = $$props;
  let { showSwitch = true } = $$props;
  let sortBy = false;
  let variantArr = [];
  let nonVariantArr = [];
  let groupedVariantProducts;
  var ItemType;
  (function(ItemType2) {
    ItemType2["VARIANT_PRODUCT"] = "VARIANT_PRODUCT";
    ItemType2["NONVARIANT_PRODUCT"] = "NONVARIANT_PRODUCT";
    ItemType2["VARIANT_CATEGORY"] = "VARIANT_CATEGORY";
  })(ItemType || (ItemType = {}));
  const showGroupedVariant = (group) => group.flat(1).filter((variant) => !variantCategoryIds.includes(variant.CategoryId)).map((variant) => ({
    ...variant,
    Type: ItemType.VARIANT_PRODUCT
  }));
  const collateArray = (varCatsArr, nonVarArr, groupedVariantProducts2) => [...varCatsArr, ...nonVarArr, ...showGroupedVariant(groupedVariantProducts2)];
  if ($$props.productArr === void 0 && $$bindings.productArr && productArr !== void 0)
    $$bindings.productArr(productArr);
  if ($$props.variantCategories === void 0 && $$bindings.variantCategories && variantCategories !== void 0)
    $$bindings.variantCategories(variantCategories);
  if ($$props.showDetailedView === void 0 && $$bindings.showDetailedView && showDetailedView !== void 0)
    $$bindings.showDetailedView(showDetailedView);
  if ($$props.showSwitch === void 0 && $$bindings.showSwitch && showSwitch !== void 0)
    $$bindings.showSwitch(showSwitch);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    variantCategoryIds = variantCategories.map((cat) => cat.Id);
    {
      if (productArr.length) {
        variantArr = productArr.filter(({ VariantGroupId }) => !!VariantGroupId);
        nonVariantArr = productArr.filter(({ VariantGroupId }) => !VariantGroupId);
      }
    }
    {
      variantCategories.map((category) => ({
        ...category,
        Type: ItemType.VARIANT_CATEGORY
      }));
    }
    groupedVariantProducts = Object.values(groupBy(variantArr, "VariantGroupId"));
    typedVariantCategories = variantCategories.map((variant) => ({
      ...variant,
      Type: ItemType.VARIANT_CATEGORY
    }));
    typedNonVariantProductArr = nonVariantArr.map((nonVariant) => ({
      ...nonVariant,
      Type: ItemType.NONVARIANT_PRODUCT
    }));
    collatedArray = collateArray(typedVariantCategories, typedNonVariantProductArr, groupedVariantProducts);
    sortedCollatedArray = sortBy ? collatedArray.slice().sort((a, b) => "SalePrice" in a ? a.SalePrice > ("SalePrice" in b ? b.SalePrice : -1) ? -1 : 1 : -1) : collatedArray.slice().sort((a, b) => a.Name < b.Name ? -1 : 1);
    $$rendered = `<div class="${"container"}">${showSwitch ? `<div class="${"switch-container svelte-jwwlkx"}">${validate_component(Switch, "Switch").$$render($$result, {
      msg: sortBy ? "price (highest to lowest)" : "alphabetically",
      active: sortBy
    }, {
      active: ($$value) => {
        sortBy = $$value;
        $$settled = false;
      }
    }, {})}</div>` : ``}
	${productArr && browser ? `<div class="${escape(null_to_empty(showDetailedView || !calcShowGrid(window.innerWidth, variantCategories.length ? variantCategories.length + nonVariantArr.length + variantArr.filter((vars) => !variantCategoryIds.includes(vars.CategoryId)).length : productArr.length) ? "detailed-products-container" : "products-container")) + " svelte-jwwlkx"}">${each(sortedCollatedArray, (item) => {
      return `${validate_component(SingleProduct, "SingleProduct").$$render($$result, {
        variantCategory: item.Type === ItemType.VARIANT_CATEGORY ? item : null,
        product: item.Type === ItemType.VARIANT_CATEGORY ? null : item,
        showDetailedView
      }, {}, {})}`;
    })}</div>` : ``}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
export { ProductView as P };
