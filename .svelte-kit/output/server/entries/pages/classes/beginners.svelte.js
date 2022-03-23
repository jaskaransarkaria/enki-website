import { c as create_ssr_component, b as add_attribute } from "../../../chunks/index-fdb1bd20.js";
import { d as dev, b as browser } from "../../../chunks/env-14926626.js";
var beginners_svelte_svelte_type_style_lang = "";
const css = {
  code: "a.svelte-mtso78.svelte-mtso78{cursor:pointer}.container.svelte-mtso78.svelte-mtso78{display:flex;margin:1em;width:100vw;flex-direction:column;align-items:center}p.svelte-mtso78.svelte-mtso78{width:90%;align-self:center;text-align:center;font-family:'Caviar Dreams'}.class-pics.svelte-mtso78.svelte-mtso78{display:flex;flex-direction:row;width:100%;align-self:center;justify-content:center}.class-pics.svelte-mtso78>.svelte-mtso78{height:80px;padding:5px}@media(min-width: 600px){.class-pics.svelte-mtso78.svelte-mtso78{flex-direction:row;width:40%;margin-bottom:2%}.class-pics.svelte-mtso78>img.svelte-mtso78{height:200px}}@media(min-width: 960px){.class-pics.svelte-mtso78.svelte-mtso78{flex-direction:row;width:40%;margin-bottom:2%}.class-pics.svelte-mtso78>img.svelte-mtso78{height:300px}p.svelte-mtso78.svelte-mtso78{width:50%}}",
  map: null
};
const hydrate = dev;
const router = browser;
const prerender = true;
const Beginners = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ttWidget;
  $$result.css.add(css);
  return `<div class="${"container svelte-mtso78"}"><div class="${"class-pics svelte-mtso78"}"><img src="${"https://enki.imgix.net/classes_example_1.jpg?auto=format,compress"}" alt="${"A man and a woman, the man is holding the rings in the palm of his hands"}" class="${"svelte-mtso78"}">
    <img src="${"https://enki.imgix.net/classes_example_2.jpg?auto=format,compress"}" alt="${"two women looking longingly into each other's eyes wearing their rings"}" class="${"svelte-mtso78"}">
    <img src="${"https://enki.imgix.net/classes_example_3.jpg?auto=format,compress"}" alt="${"enki jewellery ring boxes"}" class="${"svelte-mtso78"}"></div>
  <p class="${"svelte-mtso78"}">Ever wanted to learn to make your own jewellery? Looking for a unique
    present for a friend? <br><br>At Enki workshops you can meet new people
    and learn a new craft. The one off classes include all the tools and
    materials needed to make your jewellery, soft and hot drinks, and cake from
    the wonderful Early Bird Bakery next door. <br><br>We also take group
    bookings where you can choose the date and topic, get in contact
    <a href="${"/contact"}" class="${"svelte-mtso78"}">here</a> with any enquiries.
  </p></div>

  <div class="${"tt-widget"}"${add_attribute("this", ttWidget, 0)}><div class="${"tt-widget-fallback"}"><p class="${"svelte-mtso78"}"><a href="${"https://www.tickettailor.com/all-tickets/enki/?ref=website_widget"}" target="${"_blank"}" class="${"svelte-mtso78"}">Click here to buy tickets</a><br><small><a href="${"https://www.tickettailor.com?rf=wdg"}" class="${"tt-widget-powered svelte-mtso78"}">Sell tickets online with Ticket Tailor</a></small></p></div>
  ${``}
</div>`;
});
export { Beginners as default, hydrate, prerender, router };
