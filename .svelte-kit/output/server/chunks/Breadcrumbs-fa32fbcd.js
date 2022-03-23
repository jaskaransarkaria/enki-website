import { c as create_ssr_component, a as subscribe, k as each, e as escape } from "./index-fdb1bd20.js";
import "fp-ts/lib/function.js";
import "fp-ts/lib/TaskEither.js";
import "fp-ts/lib/Task.js";
import { r as readonlyAllCategories } from "./categories-699c3bd3.js";
var Breadcrumbs_svelte_svelte_type_style_lang = "";
const css = {
  code: "button.svelte-ufmvj1{display:inline-flex;align-items:center;background-color:Transparent;background-repeat:no-repeat;border:none;cursor:pointer;overflow:hidden;outline:none;font-family:'Caviar Dreams';text-transform:capitalize;text-align:end}img.svelte-ufmvj1{width:15px;padding:0.25em}",
  map: null
};
const Breadcrumbs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $readonlyAllCategories, $$unsubscribe_readonlyAllCategories;
  $$unsubscribe_readonlyAllCategories = subscribe(readonlyAllCategories, (value) => $readonlyAllCategories = value);
  let { extraCrumbs = [] } = $$props;
  let { selectedCategoryId } = $$props;
  let breadcrumbs;
  const rootShop = {
    Id: 0,
    Name: "Shop",
    ParentId: 0,
    Children: [],
    NominalCode: ""
  };
  const recursiveCatSearch = (id, categories, results) => {
    for (const cat of categories) {
      if (cat.Id === id) {
        if (cat.ParentId === null) {
          return [...results, cat];
        }
        return recursiveCatSearch(cat.ParentId, $readonlyAllCategories, [...results, cat]);
      } else if (cat?.Children?.length) {
        results = recursiveCatSearch(id, cat.Children, results);
      }
    }
    return results;
  };
  if ($$props.extraCrumbs === void 0 && $$bindings.extraCrumbs && extraCrumbs !== void 0)
    $$bindings.extraCrumbs(extraCrumbs);
  if ($$props.selectedCategoryId === void 0 && $$bindings.selectedCategoryId && selectedCategoryId !== void 0)
    $$bindings.selectedCategoryId(selectedCategoryId);
  $$result.css.add(css);
  breadcrumbs = [
    rootShop,
    ...recursiveCatSearch(selectedCategoryId, $readonlyAllCategories, []).slice().reverse(),
    ...extraCrumbs
  ];
  $$unsubscribe_readonlyAllCategories();
  return `${selectedCategoryId ? `${each(breadcrumbs, (breadcrumb) => {
    return `<button class="${"svelte-ufmvj1"}"><img src="${"https://enki.imgix.net/empty_hex_1.png?auto=format,compress"}" alt="${"breadcrumb icon"}" class="${"svelte-ufmvj1"}">
			${escape(breadcrumb.Name)}
		</button>`;
  })}` : ``}`;
});
export { Breadcrumbs as B };
