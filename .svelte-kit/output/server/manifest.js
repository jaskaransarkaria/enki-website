export const manifest = {
	appDir: "_app",
	assets: new Set(["enki_icon.jpg","fonts/CaviarDreams.ttf","fonts/CaviarDreams_Bold.ttf","fonts/CaviarDreams_BoldItalic.ttf","fonts/CaviarDreams_Italic.ttf","fonts/enki-regular.ttf","powered-by-stripe.svg","robots.txt","stripe-badge-white.png"]),
	mimeTypes: {".jpg":"image/jpeg",".ttf":"font/ttf",".svg":"image/svg+xml",".txt":"text/plain",".png":"image/png"},
	_: {
		entry: {"file":"start-60324fd1.js","js":["start-60324fd1.js","chunks/vendor-301d67fd.js","chunks/singletons-d1fb5791.js"],"css":["assets/vendor-8bf8cdb1.css"]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/13.js'),
			() => import('./nodes/14.js'),
			() => import('./nodes/15.js'),
			() => import('./nodes/16.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "classes",
				pattern: /^\/classes\/?$/,
				names: [],
				types: [],
				path: "/classes",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "classes/wedding-rings",
				pattern: /^\/classes\/wedding-rings\/?$/,
				names: [],
				types: [],
				path: "/classes/wedding-rings",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "classes/beginners",
				pattern: /^\/classes\/beginners\/?$/,
				names: [],
				types: [],
				path: "/classes/beginners",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				id: "classes/payment/success",
				pattern: /^\/classes\/payment\/success\/?$/,
				names: [],
				types: [],
				path: "/classes/payment/success",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				id: "contact",
				pattern: /^\/contact\/?$/,
				names: [],
				types: [],
				path: "/contact",
				shadow: null,
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				id: "repairs",
				pattern: /^\/repairs\/?$/,
				names: [],
				types: [],
				path: "/repairs",
				shadow: null,
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				id: "about",
				pattern: /^\/about\/?$/,
				names: [],
				types: [],
				path: "/about",
				shadow: null,
				a: [0,9],
				b: [1]
			},
			{
				type: 'page',
				id: "shop",
				pattern: /^\/shop\/?$/,
				names: [],
				types: [],
				path: "/shop",
				shadow: null,
				a: [0,10,11],
				b: [1]
			},
			{
				type: 'page',
				id: "shop/category/[category]",
				pattern: /^\/shop\/category\/([^/]+?)\/?$/,
				names: ["category"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,10,12],
				b: [1]
			},
			{
				type: 'page',
				id: "shop/product/[product]",
				pattern: /^\/shop\/product\/([^/]+?)\/?$/,
				names: ["product"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,10,13],
				b: [1]
			},
			{
				type: 'page',
				id: "shop/basket",
				pattern: /^\/shop\/basket\/?$/,
				names: [],
				types: [],
				path: "/shop/basket",
				shadow: null,
				a: [0,10,14],
				b: [1]
			},
			{
				type: 'page',
				id: "shop/search",
				pattern: /^\/shop\/search\/?$/,
				names: [],
				types: [],
				path: "/shop/search",
				shadow: null,
				a: [0,10,15],
				b: [1]
			},
			{
				type: 'page',
				id: "shop/tag/[type]-[tag]",
				pattern: /^\/shop\/tag\/([^/]+?)-([^/]+?)\/?$/,
				names: ["type","tag"],
				types: [null,null],
				path: null,
				shadow: null,
				a: [0,10,16],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
