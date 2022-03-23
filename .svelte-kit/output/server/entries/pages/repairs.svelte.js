import { c as create_ssr_component } from "../../chunks/index-fdb1bd20.js";
import { d as dev, b as browser } from "../../chunks/env-14926626.js";
var repairs_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-hfol32.svelte-hfol32{text-align:center;font-family:'WelcomeHome3 Regular'}.container.svelte-hfol32.svelte-hfol32{display:flex;min-height:100vh;width:100vw;flex-direction:column;align-items:center}.testimonials-container.svelte-hfol32.svelte-hfol32{display:flex;flex-direction:column;width:90%}.testimonials-container.svelte-hfol32>p.svelte-hfol32{margin:1em}.shop-pics.svelte-hfol32.svelte-hfol32{display:flex;flex-direction:row;width:70%;height:10%;align-self:center;justify-content:center}.shop-pics.svelte-hfol32>.svelte-hfol32{width:25%;padding:5px}.extra-width.svelte-hfol32.svelte-hfol32{width:45%}p.svelte-hfol32.svelte-hfol32{width:90%;align-self:center;text-align:center;font-family:'Caviar Dreams'}@media(min-width: 960px){.testimonials-container.svelte-hfol32.svelte-hfol32{flex-direction:row;align-items:flex-start}.testimonials-container.svelte-hfol32>p.svelte-hfol32{align-self:flex-start}hr.svelte-hfol32.svelte-hfol32{display:none}}",
  map: null
};
const hydrate = dev;
const router = browser;
const prerender = true;
const Repairs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let outerWidth;
  let isMobile;
  $$result.css.add(css);
  outerWidth = 0;
  isMobile = outerWidth < 960;
  return `
<div class="${"container svelte-hfol32"}"><br>
	<div class="${"shop-pics svelte-hfol32"}"><img class="${"extra-width svelte-hfol32"}" src="${"https://enki.imgix.net/services_1.jpg?auto=format,compress"}" alt="${"a ring being polished on a polishing machine"}">
		${!isMobile ? `<img src="${"https://enki.imgix.net/services_2.jpg?auto=format,compress"}" alt="${"a jewellery machine for pressing metal"}" class="${"svelte-hfol32"}">` : ``}
		${isMobile ? `<img src="${"https://enki.imgix.net/services_4.jpg?auto=format,compress"}" alt="${"a medallion being heated with a blow touch"}" class="${"svelte-hfol32"}">` : ``}
		<img class="${"extra-width svelte-hfol32"}" src="${"https://enki.imgix.net/services_3.jpg?auto=format,compress"}" alt="${"some jewellery pliers and some jewellery being inspected"}">
		${!isMobile ? `<img src="${"https://enki.imgix.net/services_4.jpg?auto=format,compress"}" alt="${"a medallion being heated with a blow touch"}" class="${"svelte-hfol32"}">` : ``}</div>
	<p class="${"svelte-hfol32"}">Got a necklace you&#39;re afraid to wear because the clasp sometimes fails? Have a ring you&#39;ve loved
		for such a long time that the shank has worn away to nothing? We hate to see jewellery thrown
		away, bring it in and we\u2019ll get it back to its former glory. We can even create a new partner
		for a lonely earring! Click here to get in touch.
	</p>
	<h2 class="${"svelte-hfol32"}">Testimonials</h2>
	<div class="${"testimonials-container svelte-hfol32"}">${isMobile ? `<p class="${"svelte-hfol32"}">&quot;Beautiful little shop. I needed a bracelet repaired and a ring setting. Faith gave me some
				great advice and the repairs were done quickly.&quot; - Alexandra B
			</p>
			<hr style="${"width: 100%"}" class="${"svelte-hfol32"}">
			<p class="${"svelte-hfol32"}">&quot;Had my wedding ring cut off due to swollen finger, it was repaired with an additional piece
				added, not the slightest sign anything had happened . Would recommend her to anyone. Thank
				you.&quot; - Will M
			</p>` : `<p class="${"svelte-hfol32"}">&quot;Beautiful little shop. I needed a bracelet repaired and a ring setting. Faith gave me some
				great advice and the repairs were done quickly.&quot; - Alexandra B
				<br>
				<br>
				&quot;Had my wedding ring cut off due to swollen finger, it was repaired with an additional piece
				added, not the slightest sign anything had happened . Would recommend her to anyone. Thank you.&quot;
				- Will M
			</p>`}
		<hr style="${"width: 100%"}" class="${"svelte-hfol32"}">
		<p class="${"svelte-hfol32"}">&quot;I ran into trouble restoring an old Gretsch snare drum of huge sentimental value to me - the
			modern part I&#39;d sourced in the USA arrived but some delicate filing was needed in order to fit
			the part to the existing mechanism\u2026 The staff were friendly and took a real interest in the
			project and carefully carried out the delicate job there and then. I could not be happier and
			would highly recommend the store, its staff and their considerable - and adaptable -
			expertise.&quot; - Dave T
		</p>
		<hr style="${"width: 100%"}" class="${"svelte-hfol32"}">
		<p class="${"svelte-hfol32"}">&quot;I took a diamond ring to Enki to be repaired. The lady listened to my description of what was
			wrong. She used several tools to look at the ring and complete the repair. I was in and out in
			ten minutes with my ring repaired and very shiny. Fantastic service and very knowledgeable.
			Highly recommended.&quot; - Claire B
		</p></div>
</div>`;
});
export { Repairs as default, hydrate, prerender, router };
