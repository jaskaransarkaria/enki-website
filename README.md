# Enki - Website

The website is built in svelte and deployed with into a kubernetes cluster. The repo is based on the Svelte template [svelte-typescript-jest-routify-prettier](https://github.com/jaskaransarkaria/svelte-typescript-jest-routify-prettier).

The server code can be found [here](https://github.com/jaskaransarkaria/enki-server)

This repo contains the code for the frontend website for Enki Jewellery & Craft Gallery shop in Kings Heath, Birmingham, UK.

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

To deploy the front end locally use `npm run dev` and find the app running on `localhost:5000`. This will provide "hot reloading" so you can watch the changes you make in code.

## Testing

The repo utilises Svelte testing library and jest to test component behaviours.

## CI/ CD

Travis CI handles the deployment pipeline deploying when a commit on master is tagged with the an incremented semver eg. v01.02.03

### Todos:

- [ ] make sure stock is correctly displayed
- [ ] search by tags
- [ ] classes
- [ ] promotions
- [ ] product images (s3 bucket etc)
- [ ] style the site
- [ ] storybook
- [ ] testing