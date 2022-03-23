import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-fdb1bd20.js";
import { b as refreshProducts, c as refreshCategoryFromServer } from "../../../../chunks/categories-699c3bd3.js";
import { B as Breadcrumbs } from "../../../../chunks/Breadcrumbs-fa32fbcd.js";
import { H as HexGrid } from "../../../../chunks/HexGrid-c9d83680.js";
import { P as ProductView } from "../../../../chunks/ProductView-28599078.js";
import "fp-ts/lib/function.js";
import "fp-ts/lib/TaskEither.js";
import "fp-ts/lib/Task.js";
import "../../../../chunks/index-951b6248.js";
import "../../../../chunks/gridCalc-2d8e7fa8.js";
import "../../../../chunks/env-14926626.js";
import "lodash-es";
import "../../../../chunks/SingleProduct-101de88f.js";
import "../../../../chunks/basket-ca587022.js";
var JewelleryView_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-17zay9f{position:relative;display:block;flex-direction:column;grid-row:1;grid-column:2;text-align:center;font-family:'Welcomehome3 Regular'}",
  map: null
};
const JewelleryView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let shopByType;
  let shopByArtist;
  let { data = [] } = $$props;
  let { categoryFn } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.categoryFn === void 0 && $$bindings.categoryFn && categoryFn !== void 0)
    $$bindings.categoryFn(categoryFn);
  $$result.css.add(css);
  shopByType = data.filter((cat) => cat.Name.toLowerCase() === "fine jewellery" || cat.Name.toLowerCase() === "costume jewellery");
  shopByArtist = data.filter((cat) => cat.Name.toLowerCase() !== "fine jewellery" && cat.Name.toLowerCase() !== "costume jewellery");
  return `<h1 class="${"svelte-17zay9f"}">Shop by type</h1>
${validate_component(HexGrid, "HexGrid").$$render($$result, {
    data: shopByType,
    categoryFn,
    showFullPage: false
  }, {}, {})}
<h1 class="${"svelte-17zay9f"}">Shop by artist</h1>
${validate_component(HexGrid, "HexGrid").$$render($$result, { data: shopByArtist, categoryFn }, {}, {})}`;
});
const ProductsInCategory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { categoryId } = $$props;
  let { variantCategories = [] } = $$props;
  let { showDetailedView = false } = $$props;
  let { showSwitch = true } = $$props;
  let productArr = [];
  const productObj = {};
  const refreshProductsArr = async (id) => {
    if (id) {
      const data = await refreshProducts(`${"http://localhost:8080"}/products-by-category?id=${id.toString()}`);
      productArr = data;
      return data;
    }
    return [];
  };
  const refreshProductView = async (arr, catId) => {
    if (productObj?.[catId]?.isEmpty) {
      return;
    }
    if (arr.find((prod) => prod.CategoryId === categoryId)) {
      return;
    }
    arr = await refreshProductsArr(catId);
    if (!arr.length) {
      productObj[catId] = { isEmpty: true };
      return;
    }
  };
  if ($$props.categoryId === void 0 && $$bindings.categoryId && categoryId !== void 0)
    $$bindings.categoryId(categoryId);
  if ($$props.variantCategories === void 0 && $$bindings.variantCategories && variantCategories !== void 0)
    $$bindings.variantCategories(variantCategories);
  if ($$props.showDetailedView === void 0 && $$bindings.showDetailedView && showDetailedView !== void 0)
    $$bindings.showDetailedView(showDetailedView);
  if ($$props.showSwitch === void 0 && $$bindings.showSwitch && showSwitch !== void 0)
    $$bindings.showSwitch(showSwitch);
  {
    refreshProductView(productArr, categoryId);
  }
  return `${categoryId && (productArr.length && !productObj?.[categoryId]?.isEmpty || variantCategories.length) ? `${validate_component(ProductView, "ProductView").$$render($$result, {
    productArr,
    showDetailedView,
    variantCategories,
    showSwitch
  }, {}, {})}` : ``}`;
});
const TagView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let treatedTags;
  let { data = [] } = $$props;
  let { categoryId } = $$props;
  let { categoryFn } = $$props;
  let { prefix = "" } = $$props;
  let tags = [];
  const selectFn = (cat) => {
    if (isCategory(cat)) {
      return categoryFn(cat);
    }
    if (isTag(cat)) {
      return `/shop/tag/${cat.Name.toLowerCase()}?catid=${categoryId}&tagid=${cat.Id}`;
    }
  };
  const isCategory = (group) => "Children" in group;
  const isTag = (group) => "TagTypeId" in group;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.categoryId === void 0 && $$bindings.categoryId && categoryId !== void 0)
    $$bindings.categoryId(categoryId);
  if ($$props.categoryFn === void 0 && $$bindings.categoryFn && categoryFn !== void 0)
    $$bindings.categoryFn(categoryFn);
  if ($$props.prefix === void 0 && $$bindings.prefix && prefix !== void 0)
    $$bindings.prefix(prefix);
  treatedTags = tags.filter((tag) => !tag.Name.includes("SOR ")).filter((tag) => tag.Name.includes(prefix));
  return `${validate_component(HexGrid, "HexGrid").$$render($$result, {
    data: [...data, ...treatedTags],
    categoryFn: selectFn
  }, {}, {})}`;
});
const CategoryView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let variantCategories;
  let { categoryFn } = $$props;
  let { showBreadcrumbs = true } = $$props;
  let { showSwitch = true } = $$props;
  let { categoryToShow } = $$props;
  const removeVariantCategories = (categories) => categories?.filter((cat) => cat.NominalCode === "CATEGORY");
  if ($$props.categoryFn === void 0 && $$bindings.categoryFn && categoryFn !== void 0)
    $$bindings.categoryFn(categoryFn);
  if ($$props.showBreadcrumbs === void 0 && $$bindings.showBreadcrumbs && showBreadcrumbs !== void 0)
    $$bindings.showBreadcrumbs(showBreadcrumbs);
  if ($$props.showSwitch === void 0 && $$bindings.showSwitch && showSwitch !== void 0)
    $$bindings.showSwitch(showSwitch);
  if ($$props.categoryToShow === void 0 && $$bindings.categoryToShow && categoryToShow !== void 0)
    $$bindings.categoryToShow(categoryToShow);
  variantCategories = categoryToShow?.Children.filter((cat) => cat.NominalCode === null);
  return `${showBreadcrumbs ? `${validate_component(Breadcrumbs, "Breadcrumbs").$$render($$result, { selectedCategoryId: categoryToShow?.Id }, {}, {})}` : ``}
${removeVariantCategories(categoryToShow?.Children)?.length || categoryToShow?.Id === 1875997 || categoryToShow?.Id === 1875998 ? `${categoryToShow.Id === 1875996 ? `${validate_component(JewelleryView, "JewelleryView").$$render($$result, {
    data: removeVariantCategories(categoryToShow?.Children),
    categoryFn
  }, {}, {})}` : `${categoryToShow.Id === 1875997 || categoryToShow.Id === 1875998 ? `${validate_component(TagView, "TagView").$$render($$result, {
    data: removeVariantCategories(categoryToShow.Children),
    categoryFn,
    categoryId: categoryToShow?.Id,
    prefix: categoryToShow.Name.split(" ")[0].toUpperCase()
  }, {}, {})}` : `${validate_component(HexGrid, "HexGrid").$$render($$result, {
    data: removeVariantCategories(categoryToShow.Children),
    categoryFn
  }, {}, {})}`}`}` : ``}
${validate_component(ProductsInCategory, "ProductsInCategory").$$render($$result, {
    categoryId: categoryToShow?.Id,
    variantCategories,
    showSwitch
  }, {}, {})}`;
});
const traverseCategoryObj = (id, returnedCaptegoryObj) => {
  if (returnedCaptegoryObj?.Id === id) {
    return returnedCaptegoryObj;
  } else if (returnedCaptegoryObj?.Children) {
    for (const cat of returnedCaptegoryObj.Children) {
      if (cat.Id === id) {
        return cat;
      } else if (cat.Children) {
        const result = traverseCategoryObj(id, cat);
        if (result) {
          return result;
        }
      }
    }
  } else {
    return void 0;
  }
};
async function load({ fetch, params, url }) {
  const result = await refreshCategoryFromServer(`${"http://localhost:8080"}/category?id=${params.category}`, fetch);
  const category = traverseCategoryObj(parseInt(params.category, 10), result[0]);
  return { props: { categoryToShow: category } };
}
const prerender = true;
const U5Bcategoryu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { categoryToShow } = $$props;
  const selectCategory = (category) => `/shop/category/${category.Id}`;
  if ($$props.categoryToShow === void 0 && $$bindings.categoryToShow && categoryToShow !== void 0)
    $$bindings.categoryToShow(categoryToShow);
  return `${validate_component(CategoryView, "CategoryView").$$render($$result, {
    categoryFn: selectCategory,
    categoryToShow
  }, {}, {})}`;
});
export { U5Bcategoryu5D as default, load, prerender };
