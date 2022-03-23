import { c as create_ssr_component } from "../../chunks/index-fdb1bd20.js";
import { d as dev, b as browser } from "../../chunks/env-14926626.js";
var about_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-1lx4ehu.svelte-1lx4ehu{text-align:center;font-family:'WelcomeHome3 Regular'}.container.svelte-1lx4ehu.svelte-1lx4ehu{display:flex;min-height:100vh;width:100vw;flex-direction:column;justify-content:center;align-items:center}.shop-pics.svelte-1lx4ehu.svelte-1lx4ehu{display:flex;flex-direction:row;height:10%;width:70%;align-self:center;justify-content:center}.shop-pics.svelte-1lx4ehu>.svelte-1lx4ehu{width:30%;padding:5px}.center-image.svelte-1lx4ehu.svelte-1lx4ehu{width:60%}.about-shop.svelte-1lx4ehu.svelte-1lx4ehu{width:90%}p.svelte-1lx4ehu.svelte-1lx4ehu{align-self:center;text-align:center;font-family:'Caviar Dreams'}.employee-cards.svelte-1lx4ehu.svelte-1lx4ehu{width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;margin:30px}.card.svelte-1lx4ehu.svelte-1lx4ehu{width:90%;height:100%;display:flex;flex-direction:column;align-items:center}.card.svelte-1lx4ehu>p.svelte-1lx4ehu{justify-content:flex-start;vertical-align:top}.card.svelte-1lx4ehu>img.svelte-1lx4ehu{height:60%;width:70%}@media(min-width: 960px){.employee-cards.svelte-1lx4ehu.svelte-1lx4ehu{width:70%;flex-direction:row;align-items:flex-start;justify-content:space-between}}",
  map: null
};
const hydrate = dev;
const router = browser;
const prerender = true;
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"container svelte-1lx4ehu"}"><div class="${"shop-pics svelte-1lx4ehu"}"><img src="${"https://enki.imgix.net/left_enki.jpg?auto=format,compress"}" alt="${"a rectangular wooden display inside the shop"}" class="${"svelte-1lx4ehu"}">
		<img class="${"center-image svelte-1lx4ehu"}" src="${"https://enki.imgix.net/about_shop_1.jpg?auto=format,compress"}" alt="${"the shop front and it's window display"}">
		<img src="${"https://enki.imgix.net/right_enki.png?auto=format,compress"}" alt="${"a wooden jeweller's work bench inside the shop"}" class="${"svelte-1lx4ehu"}"></div>
	<p class="${"about-shop svelte-1lx4ehu"}">Enki is a unique gift shop and fully functioning jewellers workshop. We repair all types of
		jewellery onsite and also teach group and private jewellery classes. The Kings Heath store shows
		the work of many independent crafts people who have become almost invisible on the high street
		today. From baby clothes to pottery, jewellery to cushions, we have just the gift you&#39;re looking
		for. <br><br>We also sell beautiful and unique cards and wrapping paper to make your present
		that bit more special.
	</p>
	<h2 class="${"svelte-1lx4ehu"}">Meet the team</h2>
	<div class="${"employee-cards svelte-1lx4ehu"}"><div class="${"card svelte-1lx4ehu"}"><img src="${"https://enki.imgix.net/faith.png?auto=format,compress"}" alt="${"shop owner faith"}" class="${"svelte-1lx4ehu"}">
			<p class="${"svelte-1lx4ehu"}">Faith started Enki in 2017 in a small shop round the corner from the current location. She
				is a jeweller with over ten years of experience who specialises in repairing antique
				jewellery. She also loves to read and cook. She has a dog called Dodi who sometimes joins
				her at work! You can find her at Enki from Tuesday to Friday.
			</p></div>
		<div class="${"card svelte-1lx4ehu"}"><img src="${"https://enki.imgix.net/dora.png?auto=format,compress"}" alt="${"shop owner faith"}" class="${"svelte-1lx4ehu"}">
			<p class="${"svelte-1lx4ehu"}">Dora joined Enki in 2018 and has been learning jewellery making ever since, she\u2019s always
				been a crafter and can do amazing things with beads! She comes from Germany but has been in
				Brum for the last six years. You can find her at Enki Wednesday to Saturday and every other
				Sunday.
			</p></div>
		<div class="${"card svelte-1lx4ehu"}"><img src="${"https://enki.imgix.net/ash.png?auto=format,compress"}" alt="${"shop owner faith"}" class="${"svelte-1lx4ehu"}">
			<p class="${"svelte-1lx4ehu"}">Ash Joined Enki in 2021, he\u2019s a web developer who dabbles in photography among other things!
			</p></div></div>
</div>`;
});
export { About as default, hydrate, prerender, router };
