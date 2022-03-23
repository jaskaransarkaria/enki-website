import { c as create_ssr_component } from "../../chunks/index-fdb1bd20.js";
import { d as dev, b as browser } from "../../chunks/env-14926626.js";
var contact_svelte_svelte_type_style_lang = "";
const css = {
  code: ".contact-us-container.svelte-1m1u7o4.svelte-1m1u7o4{display:flex;flex-direction:column;justify-content:space-evenly;align-items:space-evenly;padding:20px;margin-top:1em}.contact-info.svelte-1m1u7o4.svelte-1m1u7o4{display:flex;flex-direction:column;align-items:center}.contact-info.svelte-1m1u7o4>.svelte-1m1u7o4{margin:0.5em}.contact-info.svelte-1m1u7o4>img.svelte-1m1u7o4{height:50px;width:50px}address.svelte-1m1u7o4.svelte-1m1u7o4{text-align:center;align-self:center}h1.svelte-1m1u7o4.svelte-1m1u7o4{text-align:center;font-family:'WelcomeHome3 Regular'}p.svelte-1m1u7o4.svelte-1m1u7o4{font-family:'Caviar Dreams';text-align:center}@media(min-width: 600px){.contact-info.svelte-1m1u7o4.svelte-1m1u7o4{width:100%}.submissions-text.svelte-1m1u7o4.svelte-1m1u7o4{width:60%}}",
  map: null
};
const hydrate = dev;
const router = browser;
const prerender = true;
const Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"contact-us-container svelte-1m1u7o4"}"><div class="${"contact-info svelte-1m1u7o4"}"><h1 class="${"svelte-1m1u7o4"}">Contact us</h1>
		<img src="${"https://enki.imgix.net/maps.png?auto=format,compress"}" alt="${"hand drawn street map symbol with location pin"}" class="${"svelte-1m1u7o4"}">
		<address class="${"svelte-1m1u7o4"}">30 High Street Kings Heath, B14 7JT <br> Open every day 10am-5pm
		</address>
		<img src="${"https://enki.imgix.net/telephone.png?auto=format,compress"}" alt="${"hand drawn old style home telephone with handset on top and dial around keys"}" class="${"svelte-1m1u7o4"}">
		<p class="${"svelte-1m1u7o4"}"><a href="${"tel:01214444453"}">01214444453</a> |
			<a href="${"tel:07712442736"}">07712442736</a>
			| <a href="${"mailto: faith@enkionline.com"}">faith@enkionline.com</a></p>
		<h1 class="${"svelte-1m1u7o4"}">Submissions</h1>
		<p class="${"submissions-text svelte-1m1u7o4"}">If you have a product you would like us to consider stocking at Enki, please send us an email
			with images, cost prices, minimum order quantities and links to your website and social media.
			We get a lot of these requests and are limited on space so unfortunately are only able to take
			a small selection of the submissions we receive.
		</p></div>
</div>`;
});
export { Contact as default, hydrate, prerender, router };
