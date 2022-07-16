# Enki - Website

The website is built in svelte and deployed to a kubernetes cluster. The repo is based on the Svelte template [svelte-typescript-jest-routify-prettier](https://github.com/jaskaransarkaria/svelte-typescript-jest-routify-prettier).

The server code can be found [here](https://github.com/jaskaransarkaria/enki-server)

This repo contains the code for the frontend website for `Enki Jewellery & Craft Gallery`, a shop in Kings Heath, Birmingham, UK.

The server which handles pulling product data from the epos system can be found [here](https://github.com/jaskaransarkaria/enki-server). If you run the frontend with out the server you will not have any products populating the online-shop.

## App Libraries

- Svelte, Sveltekit & Typescript
- Docker
- Kubernetes
- Svelte Testing Library
- Playwright
- Stripe
- Jest
- Travis CI
- Husky
- [Plausible](https://plausible.io/) (for analytics)

## Source Structure

The project is a SSR app, built through sveltekit.

```
src/lib
├── components
│   ├── AddToBasket
│   │   ├── AddToBasket.svelte
│   │   └── AddToBasket.test.ts
│   ├── BackToTop
│   │   └── BackToTop.svelte
│   ├── Banner
│   │   └── Banner.svelte
│   ├── Basket
│   │   └── Basket.svelte
│   ├── BasketCounter
│   │   └── BasketCounter.svelte
│   ├── Breadcrumbs
│   │   ├── Breadcrumbs.svelte
│   │   └── Breadcrumbs.test.ts
│   ├── CategoryView
│   │   ├── CategoryView.svelte
│   │   └── CategoryView.test.ts
│   ├── Checkout
│   │   ├── Checkout.svelte
│   │   ├── Checkout.test.ts
│   │   └── createCheckoutSession.ts
│   ├── DetailedSingleProduct
│   │   └── DetailedSingleProduct.svelte
│   ├── Footer
│   │   └── Footer.svelte
│   ├── Hamburger
│   │   └── Hamburger.svelte
│   ├── Header
│   │   └── Header.svelte
│   ├── Hex
│   │   └── Hex.svelte
│   ├── HexGrid
│   │   ├── HexGrid.svelte
│   │   └── HexGrid.test.ts
│   ├── Image
│   │   ├── ImageLoader.svelte
│   │   ├── Image.svelte
│   │   └── IntersectionObserver.svelte
│   ├── JewelleryView
│   │   └── JewelleryView.svelte
│   ├── LoadingSpinner
│   │   └── LoadingSpinner.svelte
│   ├── MailChimpSubscribe
│   │   └── MailChimpSubscribe.svelte
│   ├── MobileClose
│   │   └── MobileClose.svelte
│   ├── ProductView
│   │   └── ProductView.svelte
│   ├── ScrollDown
│   │   └── ScrollDown.svelte
│   ├── SearchProducts
│   │   └── SearchProducts.svelte
│   ├── SingleProduct
│   │   ├── SingleProduct.svelte
│   │   └── SingleProduct.test.ts
│   ├── Svg
│   │   ├── AboutUs.svelte
│   │   ├── Classes.svelte
│   │   ├── GroupClass.svelte
│   │   ├── JewelleryServices.svelte
│   │   ├── OnlineShop.svelte
│   │   └── WeddingRings.svelte
│   ├── SwipeImage
│   │   └── SwipeImage.svelte
│   └── TagView
│       ├── TagView.svelte
│       └── TagView.test.ts
├── stores
│   ├── basket.ts
│   ├── categories.ts
│   └── products.ts
├── types
│   ├── base.d.ts
│   ├── category.d.ts
│   ├── isCategory.ts
│   ├── isTag.ts
│   ├── product.d.ts
│   └── tag.d.ts
└── utils
    ├── basket.ts
    ├── clickOutside.ts
    ├── consts.js
    ├── gridCalc.ts
    ├── lazyAction.ts
    ├── requests.ts
    └── search.ts
src/routes
├── about.svelte
├── classes
│   ├── beginners.svelte
│   ├── index.svelte
│   └── wedding-rings.svelte
├── contact.svelte
├── __error.svelte
├── index.svelte
├── __layout.svelte
├── payment
│   └── success.svelte
├── privacy-policy.svelte
├── repairs.svelte
├── shop
│   ├── basket
│   │   └── index.svelte
│   ├── category
│   │   └── [category].svelte
│   ├── index.svelte
│   ├── __layout.svelte
│   ├── product
│   │   └── [product].svelte
│   ├── search
│   │   └── index.svelte
│   └── tag
│       └── [typetag].svelte
├── sitemap.xml.js
└── terms-and-conditions.svelte
src/sitemap.xml

38 directories, 77 files
```

We lean on functional programming at the boundaries which is why you find the requests `libs/` written with the `fp-ts` library.

We pull all the products, categories and tags as early as possible (when `/shop` loads), we then store using a svelte store and query it as the user navigates through the site (reducing api calls to the server to a minimum). If a user navigates directly to a specific page and the context hasn't initialised we hae checks in the relevant components so we pull the data when there is none in our svelte store.

### Component Structure

Categories -> (and their Children) displayed (recursively) via the `HexGrid` mounted at the head of the category tree at `RootCategories`

Products -> via the `ProductView` and then individually in `SingleProduct` and `DetailedSingleProduct`

Basket -> held in local storage via svelte store

Image -> The images only load when they come into view (we use `IntersectionObserver`) for that. This allows us to load all of our products onto one page (no need for pagination)

### Categories and NominalCode

- 'NOT_WEB' -- the category won't be shown on the site but will on the till
- 'CLASSES' -- the category won't be show in the online shop but will be shown on the `classes` page and on the till
- 'CATEGORY' -- means the category will be shown in the online shop and on the till
- '' (or null) -- means the category will be treated as a variant category and will be shown more like a product

##### Product

- 'SellOnWeb' -- this boolean lives in the product data and can be toggled from the epos till
- 'IsArchived' -- this hides the product from the website and till and can be toggled from the epos till

## Local Development

To run the front end locally use `npm run dev` and find the app running on `localhost:5000`. This will provide "hot reloading". The front-end populates product data from the server so run the server to have a full local stack.

## Testing

- `npm run test` - runs all the unit tests

- `npm run test:integration` - runs all the integration tests

### Testing Notes

The repo utilises Svelte testing library and jest to test unit test the components and uses Playwright for end-to-end testing, Playwright is coupled with a [mock-server](https://mock-server.com/).

You may notice svelte ticks present across some of the tests, as reactive statements happen asynchronously we need to use tick to wait for the DOM to completely finish updating.

## Site Images

The site pulls optimized images from Imgix service. To add a file to Imgix you must add the properly named file to the connected Imgix "source" in google cloud storage.

To upload images to products and categories, via a ui see this [service](https://github.com/jaskaransarkaria/enki-upload-photos)

## CI/ CD

Travis CI handles the deployment pipeline deploying when a commit on master is tagged with the an incremented semver eg. v01.02.03

Once the deployment is initialised the container runs a pre-deployment hook to generate an upto date sitemap using `npm run sitemap-generator`. This also runs on a cron once a week early Wednesday morning.

The app is deployed to a slim apline node container and with a node adapter to serve svelte-kit. It's hosted in our kubernetes cluster and has 3 replicas.

### Todos:

- [ ] add security headers too (webpagetest.org)
- [ ] follow lighthouse tips to increase accessibility/ performance
- [ ] tweak max-age of cached resources
