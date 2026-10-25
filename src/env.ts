import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  PUBLIC_INTERNAL_K8S_URL: { public: true, static: true },
  PUBLIC_BUCKET_URL: { public: true, static: true },
  PUBLIC_SERVER_URL: { public: true, static: true },
  PUBLIC_STRIPE_KEY: { public: true, static: true },
});
