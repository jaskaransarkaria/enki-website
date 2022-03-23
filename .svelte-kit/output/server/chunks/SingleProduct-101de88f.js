import { c as create_ssr_component, b as add_attribute, v as validate_component, a as subscribe, e as escape, n as null_to_empty, o as createEventDispatcher, p as onDestroy, k as each } from "./index-fdb1bd20.js";
import { b as basket } from "./basket-ca587022.js";
var IntersectionObserver_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: "div.svelte-105yrgh{display:flex;justify-content:center;width:100%;height:100%}",
  map: null
};
const IntersectionObserver_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { once = false } = $$props;
  let { top = 0 } = $$props;
  let { bottom = 0 } = $$props;
  let { left = 0 } = $$props;
  let { right = 0 } = $$props;
  let intersecting = false;
  let container;
  if ($$props.once === void 0 && $$bindings.once && once !== void 0)
    $$bindings.once(once);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  if ($$props.bottom === void 0 && $$bindings.bottom && bottom !== void 0)
    $$bindings.bottom(bottom);
  if ($$props.left === void 0 && $$bindings.left && left !== void 0)
    $$bindings.left(left);
  if ($$props.right === void 0 && $$bindings.right && right !== void 0)
    $$bindings.right(right);
  $$result.css.add(css$8);
  return `<div class="${"svelte-105yrgh"}"${add_attribute("this", container, 0)}>${slots.default ? slots.default({ intersecting }) : ``}
</div>`;
});
var Image_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: "img.svelte-au4ppn{max-height:100%;max-width:100%;align-self:center;opacity:0;transition:opacity 300ms ease-out}img.loaded.svelte-au4ppn{opacity:1}",
  map: null
};
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { alt } = $$props;
  let thisImage;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  $$result.css.add(css$7);
  return `<img${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)} class="${["svelte-au4ppn", ""].join(" ").trim()}"${add_attribute("this", thisImage, 0)}>`;
});
const ImageLoader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { alt } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  return `${validate_component(IntersectionObserver_1, "IntersectionObserver").$$render($$result, { once: true }, {}, {
    default: ({ intersecting }) => {
      return `${intersecting ? `${validate_component(Image, "Image").$$render($$result, { alt, src }, {}, {})}` : ``}`;
    }
  })}`;
});
var AddToBasket_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: "button.svelte-1rn3g9s{cursor:pointer;border:none;width:80%;border-radius:4px;transition:filter 0.25s}.narrow.svelte-1rn3g9s{width:35%;font-size:0.65em}.add-to-basket.svelte-1rn3g9s{background-color:white;border:none;border-radius:4px;transition:filter 0.25s;border:2px solid #ff6600;color:#ff6600}.goto-basket.svelte-1rn3g9s{background-color:#30a74b}.add-to-basket.svelte-1rn3g9s:hover{color:#ff8c00;border:2px solid #ff8c00;cursor:pointer}@media(min-width: 960px){.narrow.svelte-1rn3g9s{font-size:1em;width:30%}}@media(min-width: 2000px){.narrow.svelte-1rn3g9s{font-size:1em;width:20%}}",
  map: null
};
const AddToBasket = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $basket, $$unsubscribe_basket;
  $$unsubscribe_basket = subscribe(basket, (value) => $basket = value);
  let { product } = $$props;
  let { detailed = false } = $$props;
  let addedToBasket = $basket.findIndex((item) => item.id === product.Id.toString()) === -1 ? false : true;
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  if ($$props.detailed === void 0 && $$bindings.detailed && detailed !== void 0)
    $$bindings.detailed(detailed);
  $$result.css.add(css$6);
  $$unsubscribe_basket();
  return `${product ? `${!addedToBasket ? `<button class="${escape(null_to_empty(`add-to-basket ${detailed ? "narrow" : ""}`)) + " svelte-1rn3g9s"}">Add to Basket
		</button>` : `<button class="${escape(null_to_empty(`goto-basket ${detailed ? "narrow" : ""}`)) + " svelte-1rn3g9s"}">Go to Basket
		</button>`}` : ``}`;
});
var Swipe_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".swipe-panel.svelte-j4f7n2.svelte-j4f7n2{position:relative;height:var(--sv-swipe-panel-height, 100%);width:var(--sv-swipe-panel-width, inherit)}.swipe-item-wrapper.svelte-j4f7n2.svelte-j4f7n2{overflow:hidden;position:relative;height:inherit;z-index:var(--sv-swipe-panel-wrapper-index, 2);pointer-events:none}.swipeable-total_elements.svelte-j4f7n2.svelte-j4f7n2,.swipeable-slot-wrapper.svelte-j4f7n2.svelte-j4f7n2{position:relative;width:inherit;height:inherit}.swipe-handler.svelte-j4f7n2.svelte-j4f7n2{width:100%;position:absolute;top:var(--sv-swipe-handler-top, 0px);bottom:0px;left:0;right:0;background:rgba(0,0,0,0)}.swipe-indicator.svelte-j4f7n2.svelte-j4f7n2{position:relative;bottom:1.5rem;display:flex;justify-content:center;z-index:var(--sv-swipe-panel-wrapper-index, 2);pointer-events:none}.dot.svelte-j4f7n2.svelte-j4f7n2{height:10px;width:10px;background-color:transparent;border:1px solid grey;border-radius:50%;display:inline-block;margin:0px 2px;cursor:pointer;pointer-events:fill}.swipe-indicator.svelte-j4f7n2 .is-active.svelte-j4f7n2{background-color:var(--sv-swipe-indicator-active-color, grey)}",
  map: null
};
const Swipe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { transitionDuration = 200 } = $$props;
  let { showIndicators = false } = $$props;
  let { autoplay = false } = $$props;
  let { delay = 1e3 } = $$props;
  let { defaultIndex = 0 } = $$props;
  let { active_item = 0 } = $$props;
  let { is_vertical = false } = $$props;
  let activeIndicator = 0, indicators, total_elements = 0, availableSpace = 0, availableMeasure = 0, swipeElements, availableDistance = 0, swipeWrapper, swipeHandler, pos_axis = 0, page_axis = is_vertical ? "pageY" : "pageX", axis, last_axis_pos;
  let played = defaultIndex || 0;
  let run_interval = false;
  let fire = createEventDispatcher();
  function update() {
    let { offsetWidth, offsetHeight } = swipeWrapper.querySelector(".swipeable-total_elements");
    availableSpace = is_vertical ? offsetHeight : offsetWidth;
    [...swipeElements].forEach((element, i) => {
      element.style.transform = generateTranslateValue(availableSpace * i);
    });
    availableDistance = 0;
    availableMeasure = availableSpace * (total_elements - 1);
    if (defaultIndex) {
      changeItem(defaultIndex);
    }
  }
  function eventDelegate(type) {
    let delegationTypes = {
      add: "addEventListener",
      remove: "removeEventListener"
    };
    if (typeof window !== "undefined") {
      window[delegationTypes[type]]("mousemove", onMove);
      window[delegationTypes[type]]("mouseup", onEnd);
      window[delegationTypes[type]]("touchmove", onMove, { passive: false });
      window[delegationTypes[type]]("touchend", onEnd, { passive: false });
    }
  }
  function generateTranslateValue(value) {
    return is_vertical ? `translate3d(0, ${value}px, 0)` : `translate3d(${value}px, 0, 0)`;
  }
  function generateTouchPosCss(value, touch_end = false) {
    let transformString = generateTranslateValue(value);
    let _css = `
      -webkit-transition-duration: ${touch_end ? transitionDuration : "0"}ms;
      transition-duration: ${touch_end ? transitionDuration : "0"}ms;
      -webkit-transform: ${transformString};
      -ms-transform: ${transformString};`;
    return _css;
  }
  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", update);
    }
  });
  let touch_active = false;
  function onMove(e) {
    if (touch_active) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      let _axis = e.touches ? e.touches[0][page_axis] : e[page_axis], distance = axis - _axis + pos_axis;
      if (pos_axis == 0 && axis < _axis || pos_axis == availableMeasure && axis > _axis) {
        return;
      }
      e.preventDefault();
      if (distance <= availableMeasure && distance >= 0) {
        [...swipeElements].forEach((element, i) => {
          element.style.cssText = generateTouchPosCss(availableSpace * i - distance);
        });
        availableDistance = distance;
        last_axis_pos = _axis;
      }
    }
  }
  function onEnd(e) {
    if (e && e.cancelable) {
      e.preventDefault();
    }
    e && e.stopImmediatePropagation();
    e && e.stopPropagation();
    let direction = axis < last_axis_pos;
    touch_active = false;
    let _as = availableSpace;
    let accidental_touch = Math.round(availableSpace / 50) > Math.abs(axis - last_axis_pos);
    if (accidental_touch) {
      availableDistance = Math.round(availableDistance / _as) * _as;
    } else {
      availableDistance = direction ? Math.floor(availableDistance / _as) * _as : Math.ceil(availableDistance / _as) * _as;
    }
    axis = null;
    last_axis_pos = null;
    pos_axis = availableDistance;
    activeIndicator = availableDistance / _as;
    [...swipeElements].forEach((element, i) => {
      element.style.cssText = generateTouchPosCss(_as * i - pos_axis, true);
    });
    active_item = activeIndicator;
    defaultIndex = active_item;
    eventDelegate("remove");
    let swipe_direction = direction ? "right" : "left";
    fire("change", {
      active_item,
      swipe_direction,
      active_element: swipeElements[active_item]
    });
  }
  function changeItem(item) {
    let max = availableSpace;
    availableDistance = max * item;
    activeIndicator = item;
    onEnd();
  }
  function changeView() {
    changeItem(played);
    played = played < total_elements - 1 ? ++played : 0;
  }
  function goTo(step) {
    let item = Math.max(0, Math.min(step, indicators.length - 1));
    changeItem(item);
  }
  function prevItem() {
    let step = activeIndicator - 1;
    goTo(step);
  }
  function nextItem() {
    let step = activeIndicator + 1;
    goTo(step);
  }
  if ($$props.transitionDuration === void 0 && $$bindings.transitionDuration && transitionDuration !== void 0)
    $$bindings.transitionDuration(transitionDuration);
  if ($$props.showIndicators === void 0 && $$bindings.showIndicators && showIndicators !== void 0)
    $$bindings.showIndicators(showIndicators);
  if ($$props.autoplay === void 0 && $$bindings.autoplay && autoplay !== void 0)
    $$bindings.autoplay(autoplay);
  if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0)
    $$bindings.delay(delay);
  if ($$props.defaultIndex === void 0 && $$bindings.defaultIndex && defaultIndex !== void 0)
    $$bindings.defaultIndex(defaultIndex);
  if ($$props.active_item === void 0 && $$bindings.active_item && active_item !== void 0)
    $$bindings.active_item(active_item);
  if ($$props.is_vertical === void 0 && $$bindings.is_vertical && is_vertical !== void 0)
    $$bindings.is_vertical(is_vertical);
  if ($$props.goTo === void 0 && $$bindings.goTo && goTo !== void 0)
    $$bindings.goTo(goTo);
  if ($$props.prevItem === void 0 && $$bindings.prevItem && prevItem !== void 0)
    $$bindings.prevItem(prevItem);
  if ($$props.nextItem === void 0 && $$bindings.nextItem && nextItem !== void 0)
    $$bindings.nextItem(nextItem);
  $$result.css.add(css$5);
  indicators = Array(total_elements);
  {
    {
      if (autoplay && !run_interval) {
        run_interval = setInterval(changeView, delay);
      }
      if (!autoplay && run_interval) {
        clearInterval(run_interval);
        run_interval = false;
      }
    }
  }
  return `<div class="${"swipe-panel svelte-j4f7n2"}"><div class="${"swipe-item-wrapper svelte-j4f7n2"}"${add_attribute("this", swipeWrapper, 0)}><div class="${"swipeable-total_elements svelte-j4f7n2"}"><div class="${"swipeable-slot-wrapper svelte-j4f7n2"}">${slots.default ? slots.default({}) : ``}</div></div></div>
  <div class="${"swipe-handler svelte-j4f7n2"}"${add_attribute("this", swipeHandler, 0)}></div>
   ${showIndicators ? `<div class="${"swipe-indicator swipe-indicator-inside svelte-j4f7n2"}">${each(indicators, (x, i) => {
    return `<span class="${"dot " + escape(activeIndicator == i ? "is-active" : "") + " svelte-j4f7n2"}"></span>`;
  })}</div>` : ``}</div>`;
});
var SwipeItem_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".swipeable-item.svelte-1ks2opm{position:absolute;top:0;bottom:0;left:0;right:0;transition-timing-function:ease-out}",
  map: null
};
const SwipeItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  let { classes = "" } = $$props;
  let { style = "" } = $$props;
  let { allow_dynamic_height = false } = $$props;
  let swipeItemInner = null;
  let _height = 0;
  createEventDispatcher();
  function firehHeightChange() {
  }
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.allow_dynamic_height === void 0 && $$bindings.allow_dynamic_height && allow_dynamic_height !== void 0)
    $$bindings.allow_dynamic_height(allow_dynamic_height);
  $$result.css.add(css$4);
  {
    allow_dynamic_height && active && _height && requestAnimationFrame(firehHeightChange);
  }
  return `<div class="${"swipeable-item " + escape(classes) + " " + escape(active ? "is-active" : "") + " svelte-1ks2opm"}"${add_attribute("style", style, 0)}><div class="${"swipeable-item-inner"}"${add_attribute("this", swipeItemInner, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
var ProductImage_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "img.svelte-1m40vnd{height:auto;max-width:100%}.swipe-holder.svelte-1m40vnd{width:100%;cursor:grab}@media(min-width: 960px){}@media(min-width: 1280px){}@media(min-width: 1600px){}@media(min-width: 2000px){}",
  map: null
};
const ProductImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let clientHeight;
  let outerWidth;
  let outerHeight;
  let { product } = $$props;
  let { activeItem = 0 } = $$props;
  let { SwipeComp } = $$props;
  const swipeConfig = {
    autoplay: false,
    delay: 600,
    showIndicators: false,
    transitionDuration: 500,
    defaultIndex: activeItem
  };
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  if ($$props.activeItem === void 0 && $$bindings.activeItem && activeItem !== void 0)
    $$bindings.activeItem(activeItem);
  if ($$props.SwipeComp === void 0 && $$bindings.SwipeComp && SwipeComp !== void 0)
    $$bindings.SwipeComp(SwipeComp);
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    clientHeight = 0;
    outerWidth = 0;
    outerHeight = 0;
    $$rendered = `
<div style="${"height: " + escape(clientHeight) + "px"}" class="${"swipe-holder svelte-1m40vnd"}">${product ? `${validate_component(Swipe, "Swipe").$$render($$result, Object.assign(swipeConfig, { active_item: activeItem }, { this: SwipeComp }), {
      active_item: ($$value) => {
        activeItem = $$value;
        $$settled = false;
      },
      this: ($$value) => {
        SwipeComp = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `${each(product.ProductImages, (_, idx) => {
          return `${validate_component(SwipeItem, "SwipeItem").$$render($$result, { allow_dynamic_height: true }, {}, {
            default: () => {
              return `<section><img${add_attribute("src", `https://enki.imgix.net/${product.Id}-${idx}?q=100&fit=clip&w=${outerWidth}&h=${outerHeight / 3}`, 0)}${add_attribute("alt", `${product.Name} image ${idx + 1}`, 0)} class="${"svelte-1m40vnd"}"></section>
				`;
            }
          })}`;
        })}`;
      }
    })}` : ``}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
var Thumbnails_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".is-center.svelte-14k5n18{margin-top:0.5em;display:flex;justify-content:center;align-items:center;flex-wrap:wrap}.img-fluid.svelte-14k5n18{max-width:100%;height:auto}.thumbnails.svelte-14k5n18{margin:5%;cursor:pointer;height:35px;width:35px}.rounded.svelte-14k5n18{border-radius:0.25em;transform:scale(1.15);border:2px solid lightgray}@media(min-width: 960px){.thumbnails.svelte-14k5n18{height:45px;width:45px}}@media(min-width: 1280px){}@media(min-width: 1600px){}@media(min-width: 2000px){.thumbnails.svelte-14k5n18{height:50px;width:50px}}",
  map: null
};
const Thumbnails = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { product } = $$props;
  let { activeItem = 0 } = $$props;
  let { SwipeComp } = $$props;
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  if ($$props.activeItem === void 0 && $$bindings.activeItem && activeItem !== void 0)
    $$bindings.activeItem(activeItem);
  if ($$props.SwipeComp === void 0 && $$bindings.SwipeComp && SwipeComp !== void 0)
    $$bindings.SwipeComp(SwipeComp);
  $$result.css.add(css$2);
  return `
<div class="${"is-center svelte-14k5n18"}">${each(product.ProductImages, (_, idx) => {
    return `<img class="${"img-fluid " + escape(activeItem === idx ? "rounded" : "img-thumbnail") + " thumbnails svelte-14k5n18"}"${add_attribute("src", `https://enki.imgix.net/${product.Id}-${idx}?auto=format,compress&q=10`, 0)}${add_attribute("alt", `${product.Name} thumbnail ${idx + 1}`, 0)}>`;
  })}
</div>`;
});
var DetailedSingleProduct_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "h2.svelte-1frbbxq.svelte-1frbbxq{font-family:'Welcomehome3 Regular'}h4.svelte-1frbbxq.svelte-1frbbxq{font-family:'Caviar Dreams'}.details-container.svelte-1frbbxq.svelte-1frbbxq{display:flex;flex-direction:column;align-items:center;align-self:center;border-radius:0.25em;width:100vw;height:100%;transition:all 0.2s ease-in-out;cursor:pointer;background:none;outline:none;border:none;justify-content:auto;justify-self:auto;text-align:center;cursor:auto}.detailed-products-footer.svelte-1frbbxq.svelte-1frbbxq{display:flex;justify-content:space-between;width:65%;margin:0.6em}.detailed-products-footer.svelte-1frbbxq>.svelte-1frbbxq{display:inline}@media(min-width: 360px){.detailed-products-footer.svelte-1frbbxq.svelte-1frbbxq{margin:0.8em}}@media(min-width: 700px){h2.svelte-1frbbxq.svelte-1frbbxq{font-size:2em;justify-self:start}h4.svelte-1frbbxq.svelte-1frbbxq{font-size:1em}.detailed-products-footer.svelte-1frbbxq.svelte-1frbbxq{width:25%;justify-content:space-between;margin:auto}}@media(min-width: 960px){h2.svelte-1frbbxq.svelte-1frbbxq,h4.svelte-1frbbxq.svelte-1frbbxq{text-align:start}.details-container.svelte-1frbbxq.svelte-1frbbxq{flex-direction:row;width:100%}.desktop-img-container.svelte-1frbbxq.svelte-1frbbxq{height:100%;flex-basis:30vw}.detailed-products-footer.svelte-1frbbxq.svelte-1frbbxq{flex-direction:column;align-items:flex-start;margin:2em;width:100%}h4.svelte-1frbbxq.svelte-1frbbxq{font-size:1.25em}}",
  map: null
};
const DetailedSingleProduct = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { product } = $$props;
  let { productDescription } = $$props;
  let { isMobile } = $$props;
  let SwipeComp = void 0;
  let activeItem = 0;
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  if ($$props.productDescription === void 0 && $$bindings.productDescription && productDescription !== void 0)
    $$bindings.productDescription(productDescription);
  if ($$props.isMobile === void 0 && $$bindings.isMobile && isMobile !== void 0)
    $$bindings.isMobile(isMobile);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `
${isMobile ? `<div class="${"details-container svelte-1frbbxq"}"><h2 class="${"svelte-1frbbxq"}">${escape(`${product.Name}`)}</h2>
		${product.ProductImages ? `${validate_component(ProductImage, "ProductImage").$$render($$result, { product, activeItem, SwipeComp }, {
      activeItem: ($$value) => {
        activeItem = $$value;
        $$settled = false;
      },
      SwipeComp: ($$value) => {
        SwipeComp = $$value;
        $$settled = false;
      }
    }, {})}
			${validate_component(Thumbnails, "Thumbnails").$$render($$result, { product, activeItem, SwipeComp }, {
      activeItem: ($$value) => {
        activeItem = $$value;
        $$settled = false;
      },
      SwipeComp: ($$value) => {
        SwipeComp = $$value;
        $$settled = false;
      }
    }, {})}` : ``}
		<div class="${"detailed-products-footer svelte-1frbbxq"}"><h4 class="${"svelte-1frbbxq"}">${escape(`\xA3${product.SalePrice}`)}</h4>
			<h4 class="${"svelte-1frbbxq"}">${escape(`${product.CurrentStock <= 0 ? "sold out" : product.CurrentStock + " in stock"}`)}</h4></div>
		<h4 class="${"svelte-1frbbxq"}">${escape(`${productDescription}`)}</h4>
		${validate_component(AddToBasket, "AddToBasket").$$render($$result, { product, detailed: true }, {}, {})}</div>` : `<div class="${"details-container svelte-1frbbxq"}">${product.ProductImages?.length ? `<div class="${"desktop-img-container svelte-1frbbxq"}">${validate_component(ProductImage, "ProductImage").$$render($$result, { product, activeItem, SwipeComp }, {
      activeItem: ($$value) => {
        activeItem = $$value;
        $$settled = false;
      },
      SwipeComp: ($$value) => {
        SwipeComp = $$value;
        $$settled = false;
      }
    }, {})}
				${validate_component(Thumbnails, "Thumbnails").$$render($$result, { product, activeItem, SwipeComp }, {
      activeItem: ($$value) => {
        activeItem = $$value;
        $$settled = false;
      },
      SwipeComp: ($$value) => {
        SwipeComp = $$value;
        $$settled = false;
      }
    }, {})}</div>` : ``}
		<div class="${"detailed-products-footer svelte-1frbbxq"}"><h2 class="${"svelte-1frbbxq"}">${escape(product.Name)}</h2>
			<h4 class="${"svelte-1frbbxq"}">${escape(`\xA3${product.SalePrice}`)}</h4>
			<h4 class="${"svelte-1frbbxq"}">${escape(`${product.CurrentStock <= 0 ? "sold out" : product.CurrentStock + " in stock"}`)}</h4>
			<h4 class="${"svelte-1frbbxq"}">${escape(`${productDescription}`)}</h4>
			${validate_component(AddToBasket, "AddToBasket").$$render($$result, { product, detailed: true }, {}, {})}</div></div>`}`;
  } while (!$$settled);
  return $$rendered;
});
var SingleProduct_svelte_svelte_type_style_lang = "";
const css = {
  code: ".simple-container.svelte-1487v61{display:flex;flex-direction:column;align-items:center;justify-content:center;align-self:center;justify-self:center;box-shadow:0 3px 20px rgb(0 0 0 / 0.2);border-radius:0.25em;margin:4%;height:250px;width:250px;transition:all 0.2s ease-in-out;cursor:pointer;background:none;outline:none;border:none}.simple-container.svelte-1487v61{justify-content:space-evenly}.simple-container.svelte-1487v61:hover{transform:scale(1.06);box-shadow:0 3px 65px rgb(0 0 0 / 0.2)}.position-img.svelte-1487v61{display:flex;justify-content:center;align-items:center;height:70%;width:70%}.simple-prod-name.svelte-1487v61{margin-bottom:0}h3.svelte-1487v61{display:block;font-size:0.7em;margin-top:0}h3.svelte-1487v61{text-align:center}h3.svelte-1487v61,a.svelte-1487v61{font-family:'Caviar Dreams';color:black}a.svelte-1487v61:hover{text-decoration:none}@media(min-width: 360px){.simple-container.svelte-1487v61{height:150px;width:150px}h3.svelte-1487v61{font-size:0.6em}}@media(min-width: 700px){.simple-container.svelte-1487v61{height:300px;width:300px}h3.svelte-1487v61{font-size:1.2em}}@media(min-width: 960px){.simple-container.svelte-1487v61{height:450px;width:450px}}@media(min-width: 1280px){.simple-container.svelte-1487v61{height:385px;width:385px}}@media(min-width: 1600px){.simple-container.svelte-1487v61{height:340px;width:340px}}@media(min-width: 2000px){.simple-container.svelte-1487v61{height:450px;width:450px}}",
  map: null
};
const SingleProduct = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let outerWidth;
  let isMobile;
  let { variantCategory = null } = $$props;
  let { product } = $$props;
  let { showDetailedView = false } = $$props;
  let productDescription;
  if ($$props.variantCategory === void 0 && $$bindings.variantCategory && variantCategory !== void 0)
    $$bindings.variantCategory(variantCategory);
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  if ($$props.showDetailedView === void 0 && $$bindings.showDetailedView && showDetailedView !== void 0)
    $$bindings.showDetailedView(showDetailedView);
  $$result.css.add(css);
  {
    if (product) {
      productDescription = product?.ProductDetails?.DetailedDescription || product.Description;
    }
  }
  outerWidth = 0;
  isMobile = outerWidth < 960;
  return `
${variantCategory ? `<a sveltekit:prefetch class="${"simple-container svelte-1487v61"}"${add_attribute("href", `./${variantCategory.Id}`, 0)}><div class="${"position-img svelte-1487v61"}">${validate_component(ImageLoader, "ImageLoader").$$render($$result, {
    src: `https://enki.imgix.net/${variantCategory.Id}?auto=format,compress`,
    alt: `${variantCategory.Name}`
  }, {}, {})}</div>
		<h3 class="${"basic-header svelte-1487v61"}">${escape(`${variantCategory.Name}`)}</h3>
		<h3 class="${"svelte-1487v61"}">Individually priced</h3></a>` : ``}

${product ? `${showDetailedView ? `${validate_component(DetailedSingleProduct, "DetailedSingleProduct").$$render($$result, { product, productDescription, isMobile }, {}, {})}` : `<a sveltekit:prefetch class="${"simple-container svelte-1487v61"}"${add_attribute("href", `/shop/product/${product.Id}`, 0)}>${product.ProductImages?.length ? `<div class="${"position-img svelte-1487v61"}">${validate_component(ImageLoader, "ImageLoader").$$render($$result, {
    src: `https://enki.imgix.net/${product.Id}-0?auto=format,compress`,
    alt: `${product.Name}`
  }, {}, {})}</div>` : ``}
			<h3 class="${"simple-prod-name svelte-1487v61"}">${escape(`${product.Name}`)}</h3>
			<h3 class="${"svelte-1487v61"}">${escape(`\xA3${product.SalePrice}`)}</h3></a>`}` : ``}`;
});
export { SingleProduct as S };
