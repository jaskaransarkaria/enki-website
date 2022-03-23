import { c as create_ssr_component, e as escape, n as null_to_empty, a as subscribe, v as validate_component, b as add_attribute } from "../../chunks/index-fdb1bd20.js";
import { p as page } from "../../chunks/stores-00321fe1.js";
import { t as tweened } from "../../chunks/index-026875ac.js";
import { b as basket } from "../../chunks/basket-ca587022.js";
import { B as BackToTop } from "../../chunks/BackToTop-31b1322c.js";
import "../../chunks/index-951b6248.js";
var SearchProducts_svelte_svelte_type_style_lang = "";
var Hamburger_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".menu.svelte-1sjbvh0.svelte-1sjbvh0{position:fixed;top:0;left:0;width:100vw;min-height:100vh;height:100%;z-index:100;background-color:white;display:flex;flex-direction:column;justify-content:center;align-items:center}button.svelte-1sjbvh0.svelte-1sjbvh0{all:unset;font-family:'WelcomeHome3 Regular';font-size:3.2em;cursor:pointer;margin:30px}button.svelte-1sjbvh0.svelte-1sjbvh0:focus{border-bottom:3px solid orange}#nav-icon3.svelte-1sjbvh0.svelte-1sjbvh0{position:absolute;width:40px;height:45px;margin:5px;z-index:101;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:0.5s ease-in-out;-moz-transition:0.5s ease-in-out;-o-transition:0.5s ease-in-out;transition:0.5s ease-in-out;cursor:pointer}#nav-icon3.svelte-1sjbvh0 span.svelte-1sjbvh0{display:block;position:absolute;height:3.5px;width:100%;background:black;border-radius:3px;opacity:1;left:0;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:0.25s ease-in-out;-moz-transition:0.25s ease-in-out;-o-transition:0.25s ease-in-out;transition:0.25s ease-in-out}#nav-icon3.svelte-1sjbvh0 span.svelte-1sjbvh0:nth-child(1){top:9px}#nav-icon3.svelte-1sjbvh0 span.svelte-1sjbvh0:nth-child(2),#nav-icon3.svelte-1sjbvh0 span.svelte-1sjbvh0:nth-child(3){top:21px}#nav-icon3.svelte-1sjbvh0 span.svelte-1sjbvh0:nth-child(4){top:33px}#nav-icon3.open.svelte-1sjbvh0 span.svelte-1sjbvh0:nth-child(1){top:18px;width:0%;left:50%}#nav-icon3.open.svelte-1sjbvh0 span.svelte-1sjbvh0:nth-child(2){-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}#nav-icon3.open.svelte-1sjbvh0 span.svelte-1sjbvh0:nth-child(3){-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}#nav-icon3.open.svelte-1sjbvh0 span.svelte-1sjbvh0:nth-child(4){top:18px;width:0%;left:50%}",
  map: null
};
const Hamburger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<div class="${escape(null_to_empty("")) + " svelte-1sjbvh0"}" id="${"nav-icon3"}"><span class="${"svelte-1sjbvh0"}"></span>
	<span class="${"svelte-1sjbvh0"}"></span>
	<span class="${"svelte-1sjbvh0"}"></span>
	<span class="${"svelte-1sjbvh0"}"></span></div>

${``}`;
});
var Header_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".header.svelte-1z009o9.svelte-1z009o9{display:flex;justify-content:space-between;position:fixed;top:0;width:100%;height:55px;z-index:99;background-color:white;box-shadow:0 0 20px 0 #a3a8a5}.left-container.svelte-1z009o9.svelte-1z009o9{display:flex;justify-content:space-around;padding:15px;width:18%}.right-container.svelte-1z009o9.svelte-1z009o9{display:flex;align-self:flex-end;height:100%;position:absolute;left:100%;transform:translateX(-100%)}.right-container.svelte-1z009o9 .svelte-1z009o9{align-self:flex-end}.mobile-basket-icon-container.svelte-1z009o9.svelte-1z009o9{display:flex;align-self:center;align-items:center;justify-content:center}.num-basket-items.svelte-1z009o9.svelte-1z009o9{position:absolute;cursor:pointer;transform:translate(-10%, 10%)}.animate-basket-number-even.svelte-1z009o9.svelte-1z009o9{animation:svelte-1z009o9-blinker 0.75s linear 1}.animate-basket-number-odd.svelte-1z009o9.svelte-1z009o9{animation:svelte-1z009o9-blinker-odd 0.75s linear 1}@keyframes svelte-1z009o9-blinker-odd{50%{opacity:0}}@keyframes svelte-1z009o9-blinker{50%{opacity:0}}img.svelte-1z009o9.svelte-1z009o9:hover{cursor:pointer}.basket-icon.svelte-1z009o9.svelte-1z009o9{margin-right:10px}.basket-icon.svelte-1z009o9.svelte-1z009o9,.search-icon.svelte-1z009o9.svelte-1z009o9{width:25px;align-self:center}.enki-logo.svelte-1z009o9.svelte-1z009o9{position:absolute;top:22.5%;left:50%;width:75px;transform:translateX(-50%)}button.svelte-1z009o9.svelte-1z009o9{all:unset;font-family:'WelcomeHome3 Regular';cursor:pointer}.selected.svelte-1z009o9.svelte-1z009o9{border-bottom:3px solid #ff6600}@media(min-width: 360px){.basket-icon.svelte-1z009o9.svelte-1z009o9,.search-icon.svelte-1z009o9.svelte-1z009o9{width:30px}.enki-logo.svelte-1z009o9.svelte-1z009o9{top:10%;width:100px}}@media(min-width: 700px){.basket-icon.svelte-1z009o9.svelte-1z009o9,.search-icon.svelte-1z009o9.svelte-1z009o9{width:35px}.enki-logo.svelte-1z009o9.svelte-1z009o9{top:10%;width:75px}}@media(min-width: 960px){.right-container.svelte-1z009o9.svelte-1z009o9{display:flex;justify-content:flex-end;width:35%}.right-container.svelte-1z009o9 .svelte-1z009o9{margin-right:10px;align-self:center}button.svelte-1z009o9.svelte-1z009o9{font-size:0.75em}.left-container.svelte-1z009o9.svelte-1z009o9{width:30%}.num-basket-items.svelte-1z009o9.svelte-1z009o9{transform:translate(-120%, 100%)}}@media(min-width: 1280px){.header.svelte-1z009o9.svelte-1z009o9{height:65px}.basket-icon.svelte-1z009o9.svelte-1z009o9,.search-icon.svelte-1z009o9.svelte-1z009o9{width:40px}.enki-logo.svelte-1z009o9.svelte-1z009o9{top:10%;width:100px}}@media(min-width: 1400px){.left-container.svelte-1z009o9.svelte-1z009o9{width:25%}}@media(min-width: 1960px){.header.svelte-1z009o9.svelte-1z009o9{height:75px}.basket-icon.svelte-1z009o9.svelte-1z009o9,.search-icon.svelte-1z009o9.svelte-1z009o9{width:45px}.enki-logo.svelte-1z009o9.svelte-1z009o9{top:10%;width:125px}button.svelte-1z009o9.svelte-1z009o9{font-size:1em}.left-container.svelte-1z009o9.svelte-1z009o9{width:22.5%}}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let outerWidth;
  let isMobile;
  let basketNumber;
  let selected;
  let $page, $$unsubscribe_page;
  let $basketStore, $$unsubscribe_basketStore;
  let $left, $$unsubscribe_left;
  let $$unsubscribe_growSearch;
  let $$unsubscribe_searchLeft;
  let $$unsubscribe_width;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_basketStore = subscribe(basket, (value) => $basketStore = value);
  const width = tweened(0, { duration: 500 });
  $$unsubscribe_width = subscribe(width, (value) => value);
  const left = tweened(0, { duration: 500 });
  $$unsubscribe_left = subscribe(left, (value) => $left = value);
  const growSearch = tweened(0, { duration: 500 });
  $$unsubscribe_growSearch = subscribe(growSearch, (value) => value);
  const searchLeft = tweened(0, { duration: 500 });
  $$unsubscribe_searchLeft = subscribe(searchLeft, (value) => value);
  const move = (x) => `transform: translateX(${x}px);`;
  let animateBasketNumber = false;
  $$result.css.add(css$3);
  outerWidth = 0;
  isMobile = outerWidth < 960;
  basketNumber = $basketStore?.reduce((acc, curr) => acc + curr.quantity, 0) ?? 0;
  {
    if (basketNumber) {
      animateBasketNumber = !animateBasketNumber;
    }
  }
  selected = $page.url.toString();
  $$unsubscribe_page();
  $$unsubscribe_basketStore();
  $$unsubscribe_left();
  $$unsubscribe_growSearch();
  $$unsubscribe_searchLeft();
  $$unsubscribe_width();
  return `
<div class="${"header svelte-1z009o9"}">${outerWidth < 960 ? `${validate_component(Hamburger, "Hamburger").$$render($$result, {}, {}, {})}` : `<div class="${"left-container svelte-1z009o9"}"><button class="${escape(null_to_empty(selected.includes("shop") ? "selected" : "")) + " svelte-1z009o9"}">shop
			</button>
			<button class="${escape(null_to_empty(selected.includes("repairs") ? "selected" : "")) + " svelte-1z009o9"}">repairs
			</button>
			<button class="${escape(null_to_empty(selected.includes("classes") ? "selected" : "")) + " svelte-1z009o9"}">classes
			</button>
			<button class="${escape(null_to_empty(selected.includes("about") ? "selected" : "")) + " svelte-1z009o9"}">about
			</button>
			<button class="${escape(null_to_empty(selected.includes("contact") ? "selected" : "")) + " svelte-1z009o9"}">contact
			</button></div>`}
	${outerWidth < 960 ? `${`<img src="${"https://enki.imgix.net/header_1.png?auto=format,compress"}" alt="${"Enki"}" loading="${"eager"}" class="${"enki-logo svelte-1z009o9"}">`}` : `<img src="${"https://enki.imgix.net/header_1.png?auto=format,compress"}" alt="${"Enki"}" loading="${"eager"}" class="${"enki-logo svelte-1z009o9"}">`}
	<div class="${"right-container svelte-1z009o9"}"><img class="${"search-icon svelte-1z009o9"}" src="${"https://enki.imgix.net/search-icon.png?auto=format,compress"}" alt="${"search"}"${add_attribute("style", move($left), 0)}>
		${``}
		<div class="${escape(null_to_empty(isMobile ? "mobile-basket-icon-container" : "basket-icon-container")) + " svelte-1z009o9"}"><img class="${"basket-icon svelte-1z009o9"}" src="${"https://enki.imgix.net/basket-icon.png?auto=format,compress"}" alt="${"basket"}">
			<svg xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" xml:space="${"preserve"}" style="${"shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"}" viewBox="${"0 0 100 100"}"${add_attribute("width", isMobile ? "15" : "25", 0)}${add_attribute("height", isMobile ? "15" : "25", 0)} class="${"num-basket-items svelte-1z009o9"}"><g class="${"svelte-1z009o9"}"><circle style="${"fill:#fa6603;stroke:#fa6603;stroke-width:1.6871;stroke-miterlimit:10;"}" cx="${"50"}" cy="${"50"}" r="${"50"}" class="${"svelte-1z009o9"}"></circle><text class="${escape(null_to_empty(`${animateBasketNumber ? "animate-basket-number-odd" : "animate-basket-number-even"}`)) + " svelte-1z009o9"}" x="${"55%"}" y="${"45%"}" text-anchor="${"middle"}" stroke="${"white"}" fill="${"white"}" stroke-width="${"2.5px"}" dy="${".5em"}" font-size="${"4em"}" font-family="${"Caviar Dreams"}">${escape(basketNumber)}</text></g></svg></div></div>
</div>`;
});
var MailChimpSubscribe_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "#mc_embed_signup.svelte-1egy003{background:#fff;clear:left;font:14px Helvetica, Arial, sans-serif;width:100%}",
  map: null
};
const MailChimpSubscribe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `

<div id="${"mc_embed_signup"}" class="${"svelte-1egy003"}"><form action="${"https://enkionline.us7.list-manage.com/subscribe/post?u=e1b4cd47e0fcd668196954f5e&id=8e91d212c7"}" method="${"post"}" id="${"mc-embedded-subscribe-form"}" name="${"mc-embedded-subscribe-form"}" class="${"validate"}" target="${"_blank"}" novalidate><div id="${"mc_embed_signup_scroll"}"><input type="${"email"}" value="${""}" name="${"EMAIL"}" class="${"email"}" id="${"mce-EMAIL"}" placeholder="${"email address"}" required>
			
			<div style="${"position: absolute; left: -5000px;"}" aria-hidden="${"true"}"><input type="${"text"}" name="${"b_e1b4cd47e0fcd668196954f5e_8e91d212c7"}" tabindex="${"-1"}" value="${""}"></div>
			<div class="${"clear foot"}"><input type="${"submit"}" value="${"Subscribe"}" name="${"subscribe"}" id="${"mc-embedded-subscribe"}" class="${"button"}"></div></div></form></div>

`;
});
var Footer_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".footer.svelte-1m5oj6r{position:relative;display:flex;justify-content:space-between;bottom:0;width:100vw;height:50vh;background-color:white;box-shadow:0 -2.5px 20px 0 #a3a8a5;margin-left:0;margin-right:0;padding:5px}.left-container.svelte-1m5oj6r{height:100%;width:7.5%;display:flex;justify-content:center}.centre-container.svelte-1m5oj6r{display:flex;flex-direction:column;justify-content:center;row-gap:10px;position:absolute;left:50%;height:90%;transform:translateX(-50%)}h3.svelte-1m5oj6r{text-align:center;font-family:'WelcomeHome3 Regular';font-size:12px}.right-container.svelte-1m5oj6r{display:flex;justify-content:space-between;width:15%;height:100%;margin-right:5%}.telephone.svelte-1m5oj6r{width:95px;height:95px;align-self:center}.telephone.svelte-1m5oj6r:hover{animation:svelte-1m5oj6r-shake 0.5s;cursor:pointer;animation-iteration-count:infinite}@keyframes svelte-1m5oj6r-shake{0%{transform:translate(1px, 1px) rotate(0deg)}10%{transform:translate(-1px, -2px) rotate(-1deg)}20%{transform:translate(-3px, 0px) rotate(1deg)}30%{transform:translate(3px, 2px) rotate(0deg)}40%{transform:translate(1px, -1px) rotate(1deg)}50%{transform:translate(-1px, 2px) rotate(-1deg)}60%{transform:translate(-3px, 1px) rotate(0deg)}70%{transform:translate(3px, 1px) rotate(-1deg)}80%{transform:translate(-1px, -1px) rotate(1deg)}90%{transform:translate(1px, 2px) rotate(0deg)}100%{transform:translate(1px, -2px) rotate(-1deg)}}.trust-container.svelte-1m5oj6r{align-self:center;width:100%}.trust-badge.svelte-1m5oj6r{width:100%}@media(min-width: 600px){.footer.svelte-1m5oj6r{height:60vh}}@media(min-width: 960px){.footer.svelte-1m5oj6r{height:40vh;bottom:0}.right-container.svelte-1m5oj6r{margin-right:1%;flex-direction:column;justify-content:center}.trust-container.svelte-1m5oj6r{width:100%}}@media(min-width: 1260px){.footer.svelte-1m5oj6r{height:22.5vh}}@media(min-width: 2400px){.footer.svelte-1m5oj6r{height:15vh}.right-container.svelte-1m5oj6r{flex-direction:row;justify-content:space-between}.trust-container.svelte-1m5oj6r{width:80%}}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let outerWidth;
  let isMobile;
  $$result.css.add(css$1);
  outerWidth = 0;
  isMobile = outerWidth < 960;
  return `
<div class="${"footer svelte-1m5oj6r"}"><div class="${"left-container svelte-1m5oj6r"}">${!isMobile ? `<img class="${"telephone svelte-1m5oj6r"}" src="${"https://enki.imgix.net/telephone.png?auto=format,compress"}" alt="${"contact us"}">` : ``}</div>
	<div class="${"centre-container svelte-1m5oj6r"}"><h3 class="${"svelte-1m5oj6r"}">want to be the first to find out about new products and classes?</h3>
		${validate_component(MailChimpSubscribe, "MailChimpSubscribe").$$render($$result, {}, {}, {})}
		${isMobile ? `<div class="${"trust-container svelte-1m5oj6r"}"><a href="${"https://stripe.com/docs/payments/cards/supported-card-brands"}" target="${"blank"}"><img class="${"trust-badge svelte-1m5oj6r"}" src="${"/stripe-badge-white.png"}" alt="${"stripe trust badge"}"></a></div>` : ``}</div>
	<div class="${"right-container svelte-1m5oj6r"}">${!isMobile ? `<div class="${"trust-container svelte-1m5oj6r"}"><a href="${"https://stripe.com/docs/payments/cards/supported-card-brands"}" target="${"blank"}"><img class="${"trust-badge svelte-1m5oj6r"}" src="${"/stripe-badge-white.png"}" alt="${"stripe trust badge"}"></a></div>` : ``}</div>
</div>`;
});
var app = "";
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-114rvvi{min-height:100vh}.header-block.svelte-114rvvi{top:0%;height:55px}@media(min-width: 1280px){.header-block.svelte-114rvvi{height:65px}}@media(min-width: 1960px){.header-block.svelte-114rvvi{height:75px}}",
  map: null
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"container svelte-114rvvi"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
	<div class="${"header-block svelte-114rvvi"}"></div>
	${slots.default ? slots.default({}) : ``}
	${validate_component(BackToTop, "BackToTop").$$render($$result, {}, {}, {})}</div>
${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export { _layout as default };
