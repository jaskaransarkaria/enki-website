import { c as create_ssr_component } from "../../../chunks/index-fdb1bd20.js";
import { d as dev, b as browser } from "../../../chunks/env-14926626.js";
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-1lhrv8a.svelte-1lhrv8a{display:flex;min-height:100%;width:100vw;flex-direction:column;align-items:center;justify-content:center;padding-top:5%}.class-pics.svelte-1lhrv8a.svelte-1lhrv8a{display:flex;flex-direction:column;margin-bottom:10%}.class-button.svelte-1lhrv8a.svelte-1lhrv8a{border:none;background:none}.class-button.svelte-1lhrv8a.svelte-1lhrv8a:hover{cursor:pointer}.class-button.svelte-1lhrv8a>img.svelte-1lhrv8a{width:80%;padding:5px}@media(min-width: 960px){.class-pics.svelte-1lhrv8a.svelte-1lhrv8a{flex-direction:row;margin-bottom:2%}}@media(min-width: 2200px){.class-pics.svelte-1lhrv8a.svelte-1lhrv8a{width:50%;justify-content:space-evenly}.class-button.svelte-1lhrv8a>img.svelte-1lhrv8a{width:100%;padding:5px;margin:10px}}",
  map: null
};
const hydrate = dev;
const router = browser;
const prerender = true;
const Classes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"container svelte-1lhrv8a"}"><div class="${"class-pics svelte-1lhrv8a"}"><button class="${"class-button svelte-1lhrv8a"}"><img src="${"https://enki.imgix.net/group_portrait.png?auto=format,compress"}" alt="${"carton button with a hammer"}" class="${"svelte-1lhrv8a"}"></button>
		<button class="${"class-button svelte-1lhrv8a"}"><img src="${"https://enki.imgix.net/wedding_portrait.png?auto=format,compress"}" alt="${"cartoon button with a boquet of flowers"}" class="${"svelte-1lhrv8a"}"></button>
		<div></div></div>
</div>`;
});
export { Classes as default, hydrate, prerender, router };
