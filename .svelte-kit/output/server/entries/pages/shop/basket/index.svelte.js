import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, k as each, n as null_to_empty, v as validate_component } from "../../../../chunks/index-fdb1bd20.js";
import { b as basket } from "../../../../chunks/basket-ca587022.js";
import { s as spring } from "../../../../chunks/index-026875ac.js";
import "@stripe/stripe-js/pure.js";
import "../../../../chunks/index-951b6248.js";
var BasketCounter_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".counter.svelte-i1ru96.svelte-i1ru96{display:flex;border-top:1px solid rgba(0, 0, 0, 0.1);border-bottom:1px solid rgba(0, 0, 0, 0.1);margin-top:1em;width:60px}.counter.svelte-i1ru96 button.svelte-i1ru96{font-family:'Caviar Dreams';padding:0;border:0;background-color:transparent;color:black;text-align:center;margin:0;font-size:1em;width:35px}.counter.svelte-i1ru96 button.svelte-i1ru96:hover{background-color:lightgray;cursor:pointer}.counter-viewport.svelte-i1ru96.svelte-i1ru96{width:100%;height:4em;overflow:hidden;text-align:center;position:relative}.counter-viewport.svelte-i1ru96 strong.svelte-i1ru96{position:absolute;display:flex;width:100%;height:100%;color:var(--accent-color);font-size:1.4em;align-items:center;justify-content:center}.counter-digits.svelte-i1ru96.svelte-i1ru96{height:100%}@media(min-width: 960px){.counter.svelte-i1ru96.svelte-i1ru96{width:80px}.counter.svelte-i1ru96 button.svelte-i1ru96{font-size:1.5em}}@media(min-width: 1750px){.counter.svelte-i1ru96.svelte-i1ru96{width:100px}}",
  map: null
};
function modulo(n, m) {
  return (n % m + m) % m;
}
const BasketCounter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let offset;
  let $displayed_count, $$unsubscribe_displayed_count;
  let $$unsubscribe_basket;
  $$unsubscribe_basket = subscribe(basket, (value) => value);
  let { productObj } = $$props;
  const displayed_count = spring();
  $$unsubscribe_displayed_count = subscribe(displayed_count, (value) => $displayed_count = value);
  if ($$props.productObj === void 0 && $$bindings.productObj && productObj !== void 0)
    $$bindings.productObj(productObj);
  $$result.css.add(css$2);
  {
    displayed_count.set(productObj.quantity);
  }
  offset = modulo($displayed_count, 1);
  $$unsubscribe_displayed_count();
  $$unsubscribe_basket();
  return `<div class="${"counter svelte-i1ru96"}"><button aria-label="${"Increase the counter by one"}" class="${"svelte-i1ru96"}">+
	</button>

	<div class="${"counter-viewport svelte-i1ru96"}"><div class="${"counter-digits svelte-i1ru96"}" style="${"transform: translate(0, " + escape(100 * offset) + "%)"}"><strong style="${"top: -100%"}" aria-hidden="${"true"}" class="${"svelte-i1ru96"}">${escape(Math.floor($displayed_count + 1))}</strong>
			<strong class="${"svelte-i1ru96"}">${escape(Math.floor($displayed_count))}</strong></div></div>

	<button aria-label="${"Decrease the counter by one"}" class="${"svelte-i1ru96"}">-
	</button>
</div>`;
});
var Checkout_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".goto-checkout.svelte-1sid9oa{border:none;background-color:white;border-radius:4px;transition:filter 0.25s;border:2px solid #ff6600;color:#ff6600}button.svelte-1sid9oa:hover{color:#ff8c00;border:2px solid #ff8c00;cursor:pointer}",
  map: null
};
const Checkout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_basket;
  $$unsubscribe_basket = subscribe(basket, (value) => value);
  let { loading = false } = $$props;
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  $$result.css.add(css$1);
  $$unsubscribe_basket();
  return `<button id="${"checkout-button"}" class="${"goto-checkout svelte-1sid9oa"}">Checkout</button>`;
});
var Basket_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-16yx21w{font-family:'Caviar Dreams'}.container.svelte-16yx21w{display:flex;flex-direction:column;align-items:center;border-top:1px solid rgba(0, 0, 0, 0.1)}.mobile-product.svelte-16yx21w,.product.svelte-16yx21w{display:flex;align-items:center;width:45%;margin:1%;border-bottom:1px solid rgba(0, 0, 0, 0.1)}.mobile-product.svelte-16yx21w{width:100vw;height:auto;justify-content:space-between}.quantity.svelte-16yx21w{display:flex;flex-direction:column;justify-content:space-evenly;width:10%}.mobile-product-name.svelte-16yx21w{font-size:1em;text-align:center}.mobile-product-details.svelte-16yx21w{margin:3%;width:50%}.product-details.svelte-16yx21w{margin:3%;width:100%}.quantity-and-price.svelte-16yx21w{display:flex;justify-content:space-between;align-items:center;height:100px}.mobile-quantity.svelte-16yx21w{display:flex;justify-content:center;align-items:center}.mobile-quantity-and-price.svelte-16yx21w{flex-direction:column}.mobile-product-total.svelte-16yx21w{text-align:center}.product-total.svelte-16yx21w{text-align:left}.total.svelte-16yx21w{width:55%;display:flex;justify-content:flex-end}.mobile-total.svelte-16yx21w{margin:1.5%;display:flex;margin-top:auto;margin-bottom:55px;justify-content:space-between}.mobile-product-img.svelte-16yx21w{width:100px;margin:5%;cursor:pointer;flex:0 0 20%}.product-img.svelte-16yx21w{width:125px;height:auto;cursor:pointer;flex:0 0 20%}h2.svelte-16yx21w,h4.svelte-16yx21w{margin-top:1em;margin-bottom:0}.checkout.svelte-16yx21w{display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-end}@media(min-width: 600px){.product-img.svelte-16yx21w{width:150px}}@media(min-width: 960px){.product-img.svelte-16yx21w{width:174px;flex:0 0 174px}.product.svelte-16yx21w{width:55%}}@media(min-width: 1750px){.product-img.svelte-16yx21w{width:200px;flex:0 0 200px}.product-total.svelte-16yx21w{font-size:1.5em}}",
  map: null
};
const Basket = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let outerWidth;
  let isMobile;
  let $basket, $$unsubscribe_basket;
  $$unsubscribe_basket = subscribe(basket, (value) => $basket = value);
  let basketTotalArr;
  let total;
  let loading = false;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        basketTotalArr = $basket.map((basketItem) => ({
          total: basketItem.price * 100 * basketItem.quantity / 100
        }));
        total = basketTotalArr.reduce((acc, cur) => cur.total + acc, 0).toFixed(2);
      }
    }
    outerWidth = 0;
    isMobile = outerWidth < 960 ? true : false;
    $$rendered = `
<div class="${"container svelte-16yx21w"}"${add_attribute("style", `cursor: ${loading ? "wait" : "default"}`, 0)}>${$basket.length ? `${each($basket, (obj) => {
      return `<div class="${escape(null_to_empty(isMobile ? "mobile-product" : "product")) + " svelte-16yx21w"}"><img${add_attribute("src", `https://enki.imgix.net/${obj.id}-0?auto=format,compress`, 0)}${add_attribute("alt", `${obj.name}`, 0)} class="${escape(null_to_empty(isMobile ? "mobile-product-img" : "product-img")) + " svelte-16yx21w"}">
				<div class="${escape(null_to_empty(isMobile ? "mobile-product-details" : "product-details")) + " svelte-16yx21w"}"><h2 class="${escape(null_to_empty(isMobile ? "mobile-product-name" : "product-name")) + " svelte-16yx21w"}">${escape(obj.name)}</h2>
					<div class="${escape(null_to_empty(isMobile ? "mobile-quantity-and-price" : "quantity-and-price")) + " svelte-16yx21w"}"><div class="${escape(null_to_empty(isMobile ? "mobile-quantity" : "quantity")) + " svelte-16yx21w"}">${validate_component(BasketCounter, "BasketCounter").$$render($$result, { productObj: obj }, {}, {})}</div>
						<h4 class="${escape(null_to_empty(isMobile ? "mobile-product-total" : "product-total")) + " svelte-16yx21w"}">${escape(`\xA3${(obj.price * 100 * obj.quantity / 100).toFixed(2)}`)}</h4>
					</div></div>
			</div>`;
    })}
		<div class="${escape(null_to_empty(isMobile ? "mobile-total" : "total")) + " svelte-16yx21w"}"><div class="${"checkout svelte-16yx21w"}"><h2 class="${"svelte-16yx21w"}">Subtotal: \xA3${escape(total)}</h2>
				<h5 class="${"svelte-16yx21w"}">Tax included &amp; shipping calculated at checkout</h5>
				${validate_component(Checkout, "Checkout").$$render($$result, { loading }, {
      loading: ($$value) => {
        loading = $$value;
        $$settled = false;
      }
    }, {})}</div></div>` : `<h1 class="${"svelte-16yx21w"}">You have nothing in your basket, continue shopping</h1>`}
</div>`;
  } while (!$$settled);
  $$unsubscribe_basket();
  return $$rendered;
});
const prerender = true;
const Basket_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Basket, "Basket").$$render($$result, {}, {}, {})}`;
});
export { Basket_1 as default, prerender };
