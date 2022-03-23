import { c as create_ssr_component } from "./index-fdb1bd20.js";
var BackToTop_svelte_svelte_type_style_lang = "";
const css = {
  code: ".back-to-top.svelte-sw6nko{position:sticky;bottom:5vh;left:95vw;opacity:1;border-radius:100%;transition:opacity 0.5s, visibility 0.5s;z-index:99;color:grey;width:30px;height:30px;cursor:pointer;text-align:center;margin:5px auto 20px auto}.back-to-top.hidden.svelte-sw6nko{opacity:0;visibility:hidden}",
  map: null
};
const BackToTop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showOnPx = 150 } = $$props;
  if ($$props.showOnPx === void 0 && $$bindings.showOnPx && showOnPx !== void 0)
    $$bindings.showOnPx(showOnPx);
  $$result.css.add(css);
  return `

<button class="${["back-to-top svelte-sw6nko", "hidden"].join(" ").trim()}">^</button>`;
});
export { BackToTop as B };
