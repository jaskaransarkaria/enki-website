import { c as create_ssr_component, b as add_attribute, v as validate_component, e as escape, n as null_to_empty } from "../../chunks/index-fdb1bd20.js";
import { b as browser } from "../../chunks/env-14926626.js";
import { G as GetProducts } from "../../chunks/GetProducts-5b930a45.js";
import { B as BackToTop } from "../../chunks/BackToTop-31b1322c.js";
import "../../chunks/index-951b6248.js";
import "fp-ts/lib/function.js";
import "fp-ts/lib/TaskEither.js";
import "fp-ts/lib/Task.js";
var ScrollDown_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".mobile-scroll-prompt.svelte-ik7t1l button.svelte-ik7t1l{position:absolute;left:50%;z-index:2;display:inline-block;background:none;border:none;-webkit-transform:translate(0, -50%);transform:translateX(-50%);color:black;text-align:center;font-size:0.8em;font-family:'Caviar Dreams';letter-spacing:0.1em;text-decoration:none;transition:opacity 0.3s}.mobile-scroll-prompt.svelte-ik7t1l button.svelte-ik7t1l:hover{opacity:0.5}.mobile-scroll-prompt.svelte-ik7t1l button.svelte-ik7t1l{padding-top:60px}.mobile-scroll-prompt.svelte-ik7t1l button span.svelte-ik7t1l{position:absolute;top:15px;margin-left:-12px;left:50%;width:24px;height:24px;border-left:1px solid grey;border-bottom:1px solid grey;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);box-sizing:border-box}.mobile-scroll-prompt.svelte-ik7t1l.svelte-ik7t1l{opacity:1;animation:svelte-ik7t1l-fade 8s ease-in-out;animation-iteration-count:infinite}@keyframes svelte-ik7t1l-fade{0%,100%{opacity:0}50%{opacity:1}}",
  map: null
};
const ScrollDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<section class="${"mobile-scroll-prompt svelte-ik7t1l"}"><button class="${"svelte-ik7t1l"}"><span class="${"svelte-ik7t1l"}"></span>scroll</button>
</section>`;
});
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-1okbu1z.svelte-1okbu1z{display:grid;grid-template-columns:repeat(100, 1fr);grid-template-rows:repeat(100, 1fr);width:100%;margin-left:0;margin-right:0}.mobile-container.svelte-1okbu1z.svelte-1okbu1z{display:flex;flex-direction:column;width:100vw;margin-left:0;margin-right:0}.mobile-button-container.svelte-1okbu1z.svelte-1okbu1z{display:flex;flex-direction:column;justify-content:flex-end;height:200vh;width:100vw}.mobile-button-container.svelte-1okbu1z>.svelte-1okbu1z{width:80%;align-self:center;padding:10px}.inside-shop.svelte-1okbu1z.svelte-1okbu1z{z-index:-1;grid-column-start:1;grid-column-end:span end;grid-row-start:1;grid-row-end:span end}.parrallax-inside-shop.svelte-1okbu1z.svelte-1okbu1z{position:fixed;z-index:-1}.about.svelte-1okbu1z.svelte-1okbu1z,.classes.svelte-1okbu1z.svelte-1okbu1z,.repairs-and-comms.svelte-1okbu1z.svelte-1okbu1z,.online-shop.svelte-1okbu1z.svelte-1okbu1z:hover{cursor:pointer}@media(min-width: 450px){.online-shop.svelte-1okbu1z.svelte-1okbu1z{width:80px;grid-column-start:68;grid-column-end:span end;grid-row-start:62;grid-row-end:span end}.about.svelte-1okbu1z.svelte-1okbu1z{width:80px;grid-column-start:36;grid-column-end:span end;grid-row-start:58;grid-row-end:span end}.repairs-and-comms.svelte-1okbu1z.svelte-1okbu1z{width:90px;grid-column-start:10;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}.classes.svelte-1okbu1z.svelte-1okbu1z{width:90px;grid-column-start:80;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}}@media(min-width: 600px){.online-shop.svelte-1okbu1z.svelte-1okbu1z{width:100px;grid-column-start:68;grid-column-end:span end;grid-row-start:64;grid-row-end:span end}.about.svelte-1okbu1z.svelte-1okbu1z{width:80px;grid-column-start:38;grid-column-end:span end;grid-row-start:62;grid-row-end:span end}.repairs-and-comms.svelte-1okbu1z.svelte-1okbu1z{width:100px;grid-column-start:12;grid-column-end:span end;grid-row-start:1;grid-row-end:span end}.classes.svelte-1okbu1z.svelte-1okbu1z{width:100px;grid-column-start:77;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}}@media(min-width: 800px){.online-shop.svelte-1okbu1z.svelte-1okbu1z{width:130px;grid-column-start:68;grid-column-end:span end;grid-row-start:64;grid-row-end:span end}.about.svelte-1okbu1z.svelte-1okbu1z{width:120px;grid-column-start:39;grid-column-end:span end;grid-row-start:62;grid-row-end:span end}.repairs-and-comms.svelte-1okbu1z.svelte-1okbu1z{width:120px;grid-column-start:10;grid-column-end:span end;grid-row-start:3;grid-row-end:span end}.classes.svelte-1okbu1z.svelte-1okbu1z{width:120px;grid-column-start:70;grid-column-end:span end;grid-row-start:4;grid-row-end:span end}}@media(min-width: 1024px){.online-shop.svelte-1okbu1z.svelte-1okbu1z{width:150px;grid-column-start:70;grid-column-end:span end;grid-row-start:64;grid-row-end:span end}.about.svelte-1okbu1z.svelte-1okbu1z{width:140px;grid-column-start:39;grid-column-end:span end;grid-row-start:62;grid-row-end:span end}.repairs-and-comms.svelte-1okbu1z.svelte-1okbu1z{width:140px;grid-column-start:12;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}.classes.svelte-1okbu1z.svelte-1okbu1z{width:140px;grid-column-start:66;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}}@media(min-width: 1280px){.online-shop.svelte-1okbu1z.svelte-1okbu1z{width:180px;grid-column-start:70;grid-column-end:span end;grid-row-start:64;grid-row-end:span end}.about.svelte-1okbu1z.svelte-1okbu1z{width:180px;grid-column-start:38;grid-column-end:span end;grid-row-start:62;grid-row-end:span end}.repairs-and-comms.svelte-1okbu1z.svelte-1okbu1z{width:180px;grid-column-start:12;grid-column-end:span end;grid-row-start:2;grid-row-end:span end}.classes.svelte-1okbu1z.svelte-1okbu1z{width:180px;grid-column-start:69;grid-column-end:span end;grid-row-start:1;grid-row-end:span end}}@media(min-width: 1440px){.online-shop.svelte-1okbu1z.svelte-1okbu1z{width:200px;grid-column-start:70;grid-column-end:span end;grid-row-start:64;grid-row-end:span end}.about.svelte-1okbu1z.svelte-1okbu1z{width:190px;grid-column-start:39;grid-column-end:span end;grid-row-start:63;grid-row-end:span end}.repairs-and-comms.svelte-1okbu1z.svelte-1okbu1z{width:190px;grid-column-start:12;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}.classes.svelte-1okbu1z.svelte-1okbu1z{width:180px;grid-column-start:66;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}}@media(min-width: 1650px){.online-shop.svelte-1okbu1z.svelte-1okbu1z{width:230px;grid-column-start:70;grid-column-end:span end;grid-row-start:64;grid-row-end:span end}.about.svelte-1okbu1z.svelte-1okbu1z{width:230px;grid-column-start:39;grid-column-end:span end;grid-row-start:62;grid-row-end:span end}.repairs-and-comms.svelte-1okbu1z.svelte-1okbu1z{width:225px;grid-column-start:14;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}.classes.svelte-1okbu1z.svelte-1okbu1z{width:225px;grid-column-start:68;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}}@media(min-width: 1960px){.online-shop.svelte-1okbu1z.svelte-1okbu1z{width:270px;grid-column-start:70;grid-column-end:span end;grid-row-start:64;grid-row-end:span end}.about.svelte-1okbu1z.svelte-1okbu1z{width:290px;grid-column-start:38;grid-column-end:span end;grid-row-start:62;grid-row-end:span end}.repairs-and-comms.svelte-1okbu1z.svelte-1okbu1z{width:260px;grid-column-start:14;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}.classes.svelte-1okbu1z.svelte-1okbu1z{width:260px;grid-column-start:68;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}}@media(min-width: 2200px){.online-shop.svelte-1okbu1z.svelte-1okbu1z{width:300px;grid-column-start:64;grid-column-end:span end;grid-row-start:64;grid-row-end:span end}.about.svelte-1okbu1z.svelte-1okbu1z{grid-column-start:40;grid-column-end:span end;grid-row-start:63;grid-row-end:span end}.repairs-and-comms.svelte-1okbu1z.svelte-1okbu1z{width:280px;grid-column-start:14;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}.classes.svelte-1okbu1z.svelte-1okbu1z{width:280px;grid-column-start:75;grid-column-end:span end;grid-row-start:5;grid-row-end:span end}}@media(min-width: 2400px){.online-shop.svelte-1okbu1z.svelte-1okbu1z{width:325px;grid-column-start:70;grid-column-end:span end;grid-row-start:64}}",
  map: null
};
const router = browser;
const prerender = true;
const MOBILE_ONLINE_SHOP = "https://enki.imgix.net/mobile_online_shop.png?auto=format,compress";
const MOBILE_JEWELLERY_SERVICES = "https://enki.imgix.net/mobile_jewellery_services.png?auto=format,compress";
const MOBILE_JEWELLERY_CLASSES = "https://enki.imgix.net/mobile_jewellery_classes.png?auto=format,compress";
const MOBILE_CONTACT_US = "https://enki.imgix.net/mobile_contact_us.png?auto=format,compress";
const MOBILE_ABOUT_US = "https://enki.imgix.net/mobile_about_us.png?auto=format,compress";
const DESKTOP_JEWELLERY_SERVICES_GIF = "https://enki.imgix.net/jewellery_services_2.gif";
const DESKTOP_JEWELLERY_SERVICES_STATIC = "https://enki.imgix.net/jewellery_services_2.png?auto=compress";
const DESKTOP_JEWELLERY_CLASSES_GIF = "https://enki.imgix.net/classes_2.gif";
const DESKTOP_JEWELLERY_CLASSES_STATIC = "https://enki.imgix.net/classes_2.png?auto=compress";
const DESKTOP_ONLINE_SHOP_GIF = "https://enki.imgix.net/online_shop_3.gif";
const DESKTOP_ONLINE_SHOP_STATIC = "https://enki.imgix.net/online_shop_3.png?auto=compress";
const DESKTOP_ABOUT_GIF = "https://enki.imgix.net/about_us_1.gif";
const DESKTOP_ABOUT_STATIC = "https://enki.imgix.net/about_us_1.png?auto=compress";
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let outerWidth;
  let outerHeight;
  let onlineShopHover;
  let repairsAndCommissionsHover;
  let classesHover;
  let aboutHover;
  let isMobile;
  $$result.css.add(css);
  outerWidth = 0;
  outerHeight = 0;
  onlineShopHover = false;
  repairsAndCommissionsHover = false;
  classesHover = false;
  aboutHover = false;
  isMobile = outerWidth <= 450 ? true : false;
  return `
${$$result.head += `<link rel="${"preload"}" as="${"image"}"${add_attribute("href", `https://enki.imgix.net/${outerWidth <= 450 ? "mobile_landing_page_2" : "inside_enki_desktop_3"}.png?${outerWidth <= 450 ? "fit=crop" : "auto=format,compress"}&h=${outerHeight}&w=${outerWidth}`, 0)} data-svelte="svelte-qphi43">${isMobile ? `<link rel="${"preload"}" as="${"image"}"${add_attribute("href", MOBILE_ONLINE_SHOP, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", MOBILE_JEWELLERY_SERVICES, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", MOBILE_JEWELLERY_CLASSES, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", MOBILE_CONTACT_US, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", MOBILE_ABOUT_US, 0)} data-svelte="svelte-qphi43">` : `<link rel="${"preload"}" as="${"image"}"${add_attribute("href", DESKTOP_JEWELLERY_SERVICES_GIF, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", DESKTOP_JEWELLERY_SERVICES_STATIC, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", DESKTOP_JEWELLERY_CLASSES_GIF, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", DESKTOP_JEWELLERY_CLASSES_STATIC, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", DESKTOP_ONLINE_SHOP_GIF, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", DESKTOP_ONLINE_SHOP_STATIC, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", DESKTOP_ABOUT_GIF, 0)} data-svelte="svelte-qphi43">
		<link rel="${"preload"}" as="${"image"}"${add_attribute("href", DESKTOP_ABOUT_STATIC, 0)} data-svelte="svelte-qphi43">`}`, ""}

${validate_component(GetProducts, "GetProducts").$$render($$result, {}, {}, {})}
<figure class="${escape(null_to_empty(isMobile ? "mobile-container" : "container")) + " svelte-1okbu1z"}"><img class="${escape(null_to_empty(isMobile ? "parrallax-inside-shop" : "inside-shop")) + " svelte-1okbu1z"}"${add_attribute("src", `https://enki.imgix.net/${outerWidth <= 450 ? "mobile_landing_page_2" : "inside_enki_desktop_3"}.png?${outerWidth <= 450 ? "fit=crop" : "auto=format,compress"}&h=${outerHeight}&w=${outerWidth}`, 0)} alt="${"welcome to the shop, this ilustration shows the shopkeeper behind her bench"}">
	${isMobile ? `${validate_component(ScrollDown, "ScrollDown").$$render($$result, {}, {}, {})}
		<div class="${"mobile-button-container svelte-1okbu1z"}"><img class="${"mobile-online-shop svelte-1okbu1z"}"${add_attribute("src", MOBILE_ONLINE_SHOP, 0)} alt="${"online shop button"}">
			<img class="${"mobile-repairs-and-comms svelte-1okbu1z"}"${add_attribute("src", MOBILE_JEWELLERY_SERVICES, 0)} alt="${"jewellery services button"}">
			<img class="${"mobile-classes svelte-1okbu1z"}"${add_attribute("src", MOBILE_JEWELLERY_CLASSES, 0)} alt="${"classes button"}">
			<img class="${"mobile-contact-us svelte-1okbu1z"}"${add_attribute("src", MOBILE_CONTACT_US, 0)} alt="${"contact us button"}">
			<img class="${"mobile-about-us svelte-1okbu1z"}"${add_attribute("src", MOBILE_ABOUT_US, 0)} alt="${"about us button"}"></div>` : `<img class="${"repairs-and-comms svelte-1okbu1z"}"${add_attribute("src", repairsAndCommissionsHover ? DESKTOP_JEWELLERY_SERVICES_GIF : DESKTOP_JEWELLERY_SERVICES_STATIC, 0)} alt="${"repair and commissions button hover over me"}">
		<img class="${"classes svelte-1okbu1z"}"${add_attribute("src", classesHover ? DESKTOP_JEWELLERY_CLASSES_GIF : DESKTOP_JEWELLERY_CLASSES_STATIC, 0)} alt="${"classes button hover over me"}">
		<img class="${"online-shop svelte-1okbu1z"}"${add_attribute("src", onlineShopHover ? DESKTOP_ONLINE_SHOP_GIF : DESKTOP_ONLINE_SHOP_STATIC, 0)} alt="${"online shop button hover over me"}">
		<img class="${"about svelte-1okbu1z"}"${add_attribute("src", aboutHover ? DESKTOP_ABOUT_GIF : DESKTOP_ABOUT_STATIC, 0)} alt="${"online shop button hover over me"}">`}</figure>
${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}`;
});
export { Routes as default, prerender, router };
