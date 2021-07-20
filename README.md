# Enki - Website

The website is built in svelte and deployed with into a kubernetes cluster. The repo is based on the Svelte template [svelte-typescript-jest-routify-prettier](https://github.com/jaskaransarkaria/svelte-typescript-jest-routify-prettier).

The server code can be found [here](https://github.com/jaskaransarkaria/enki-server)

This repo contains the code for the frontend website for `Enki Jewellery & Craft Gallery` shop in Kings Heath, Birmingham, UK.

The server which handles pulling product data from the epos system can be found [here](https://github.com/jaskaransarkaria/enki-server). If you run the frontend with out the server you will not have any products populating the online-shop.

## App Structure

* Svelte & typescript
* Docker
* Kubernetes
* Prettier
* Svelte Testing Library
* Stripe
* Jest
* Routify
* Travis CI
* Rollup
* Husky

## Local Development

To run the front end locally use `npm run dev` and find the app running on `localhost:5000`. This will provide "hot reloading" so you can watch the changes you make in code. The front-end populates product data from the server so run the server to have a full local stack.
Note that prod data can be mutated during local development, so tread carefully.

## Testing

The repo utilises Svelte testing library and jest to test component behaviours.

## Site Images

The site pulls optimized images from Imgix service. To add a file to Imgix you must add the properly named file to the connected Imgix "source" in google cloud storage. I must then add the base url for that image to the associated
product or category. In future to automate this we will need another service where by the user can upload their files themselves, for the time being we can upload them manually (or with a script) to the connected google cloud storage bucket.

## CI/ CD

Travis CI handles the deployment pipeline deploying when a commit on master is tagged with the an incremented semver eg. v01.02.03

### Todos:

- [ ] make sure stock is correctly displayed
- [ ] move heavy initial requests to a web worker?

- [ ] show image for category
- [ ] classes
- [ ] testing
- [ ] storybook

- [ ] add security headers too (webpagetest.org)

- [ ] style the site
- [ ] use prod stripe api key
- [ ] promotions and offers hmmm

- [ ] follow lighthouse tips to increase accessibility/ performance
- [ ] purge the imgix cache before releasing to prod https://docs.imgix.com/setup/purging-images
- [ ] tweak max-age of cached resources
-
- [ ] BUG: changing on sub cat level is changing the url for the category level
- [ ] remove the sub category page and introduct a product page
- [ ] introduce "breadcrumbs" for category navigation
