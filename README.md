# Enki - Website

This repo contains the code for the frontend website for `Enki Jewellery & Craft Gallery`, a shop in Kings Heath, Birmingham, UK, B14 7JT.

The website is built with the sveltekit framework and can be found on this domain [https://www.enkionline.com](https://www.enkionline.com).

The server which handles syncing data between the epos system and the website can be found [here](https://github.com/jaskaransarkaria/enki-server). If you run the frontend with out the server you will not have any products populating the online-shop.

## App Libraries

- Svelte, [Sveltekit](https://kit.svelte.dev/) & Typescript
- Docker
- Kubernetes
- Svelte Testing Library
- [Playwright](https://playwright.dev/)
- [Stripe](https://stripe.com/en-gb) (to handle payments)
- [Vitest](https://vitest.dev/)
- [Travis CI](https://www.travis-ci.com/)
- Husky
- [Plausible](https://plausible.io/) (for analytics)

## Source Structure

The project is a SSR app.

```
src/app.d.ts
src/app.html
src/hooks.server.ts
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
│   │   ├── Basket.svelte
│   │   └── Basket.test.ts
│   ├── BasketCounter
│   │   ├── BasketCounter.svelte
│   │   └── BasketCounter.test.ts
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
│   │   ├── DetailedSingleProduct.svelte
│   │   └── DetailedSingleProduct.test.ts
│   ├── Footer
│   │   └── Footer.svelte
│   ├── Hamburger
│   │   └── Hamburger.svelte
│   ├── Header
│   │   └── Header.svelte
│   ├── Hex
│   │   ├── Hex.svelte
│   │   └── Hex.test.ts
│   ├── HexGrid
│   │   ├── HexGrid.svelte
│   │   └── HexGrid.test.ts
│   ├── Image
│   │   ├── ImageLoader.svelte
│   │   ├── Image.svelte
│   │   └── IntersectionObserver.svelte
│   ├── JewelleryView
│   │   ├── JewelleryView.svelte
│   │   └── JewelleryView.test.ts
│   ├── LoadingSpinner
│   │   └── LoadingSpinner.svelte
│   ├── MailChimpSubscribe
│   │   └── MailChimpSubscribe.svelte
│   ├── MobileClose
│   │   └── MobileClose.svelte
│   ├── ProductView
│   │   ├── ProductView.svelte
│   │   └── ProductView.test.ts
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
│   ├── TagFlex
│   │   └── TagFlex.svelte
│   └── TagView
│       ├── TagView.svelte
│       └── TagView.test.ts
├── stores
│   ├── basket.ts
│   ├── categories.ts
│   └── products.ts
├── types
│   ├── base.ts
│   ├── basketProduct.ts
│   ├── category.ts
│   ├── isCategory.ts
│   ├── isTag.ts
│   ├── product.ts
│   └── tag.ts
└── utils
    ├── basket.test.ts
    ├── basket.ts
    ├── clickOutside.ts
    ├── consts.js
    ├── gridCalc.ts
    ├── lazyAction.ts
    ├── requests.test.ts
    ├── requests.ts
    ├── search.test.ts
    └── search.ts
src/routes
├── about
│   └── +page.svelte
├── classes
│   ├── beginners
│   │   └── +page.svelte
│   ├── +page.svelte
│   ├── +page.ts
│   └── wedding-rings
│       └── +page.svelte
├── contact
│   ├── +page.svelte
│   └── +page.ts
├── +error.svelte
├── +layout.server.ts
├── +layout.svelte
├── +page.svelte
├── payment
│   └── success
│       ├── +page.svelte
│       └── +page.ts
├── privacy-policy
│   ├── +page.svelte
│   └── +page.ts
├── repairs
│   └── +page.svelte
├── shop
│   ├── basket
│   │   ├── +page.svelte
│   │   └── +page.ts
│   ├── category
│   │   └── [category]
│   │       ├── +page.svelte
│   │       └── +page.ts
│   ├── +layout.svelte
│   ├── +page.svelte
│   ├── +page.ts
│   ├── product
│   │   └── [product]
│   │       ├── +page.svelte
│   │       └── +page.ts
│   ├── search
│   │   ├── +page.svelte
│   │   └── +page.ts
│   └── tag
│       └── [typetag]
│           ├── +page.svelte
│           └── +page.ts
├── sitemap.xml
│   └── +server.ts
└── terms-and-conditions
    └── +page.svelte
src/sitemap.xml

51 directories, 99 files
```

We lean on functional programming at the boundaries which is why you find the `requests.ts` written with the `fp-ts` library.

### Component Structure

Categories -> (and their Children) displayed (recursively) via the `HexGrid` mounted at the head of the category tree at `RootCategories`

Products -> via the `ProductView` and then individually in `SingleProduct` and `DetailedSingleProduct`

Basket -> held in local storage via svelte store

Image -> The images only load when they come into view (we use `IntersectionObserver` for that). This allows us to load all of our products onto one page (no need for pagination)

### Categories and NominalCode

- 'NOT_WEB' -- the category won't be shown on the site but will on the till
- 'CLASSES' -- the category won't be show in the online shop but will be shown on the `classes` page and on the till
- 'CATEGORY' -- means the category will be shown in the online shop and on the till
- '' (or null) -- means the category will be treated as a variant category and will be shown more like a product

##### Product

- 'SellOnWeb' -- this boolean lives in the product data and can be toggled from the epos till
- 'IsArchived' -- this hides the product from the website and till and can be toggled from the epos till

## Local Development

To run the front end locally use `npm run dev` and find the app running on `localhost:5000`. The front-end populates product data from the server so run the server to have a full local stack.

## Testing

- `npm run test:unit` - runs all the unit tests

- `npm run test:integration` - runs all the integration tests

### Testing Notes

The repo utilises Svelte testing library and vitest to unit test the components and uses Playwright for end-to-end testing, Playwright is coupled with a [mock-server](https://mock-server.com/).

You may notice a few svelte ticks present across some of the tests, as reactive statements happen asynchronously we need to use the svelte lifecycle [tick](https://svelte.dev/tutorial/tick) to wait for the DOM to completely finish updating.

## Site Images

The site pulls optimized images from Imgix service. To add a file to Imgix you must add the properly named file to the connected Imgix "source" in google cloud storage.

To upload images to products and categories, via a ui see this [service](https://github.com/jaskaransarkaria/enki-upload-photos)

## CI/ CD

Travis CI handles the deployment pipeline deploying when a commit on master is tagged with the an incremented semver eg. v01.02.03

Once the deployment is initialised the container runs a pre-deployment hook to generate an upto date sitemap using `npm run sitemap-generator`. This also runs on a cron once a week early Wednesday morning.

The app is deployed to a slim apline node container and with a node adapter to serve svelte-kit. It's hosted in our kubernetes cluster and has 3 replicas.
