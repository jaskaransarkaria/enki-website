const esModules = ["lodash-es"].join("|");

module.exports = {
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        preprocess: true,
      },
    ],
    "^.+\\.ts$": "ts-jest",
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "js", "mjs", "svelte"],
  verbose: true,
  testPathIgnorePatterns: [
    "node_modules",
    "createCheckoutSession.ts",
    "tests/",
  ],
  transformIgnorePatterns: [`node_modules/?!(${esModules})/`], // ignore everything in node_modules but roxi
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    "^$lib/(.*)$": "<rootDir>/src/lib/$1",
    "^lodash-es$": "lodash",
    "^$app/(.*)$": "<rootDir>/.svelte-kit/dev/runtime/app$1",
  },
  collectCoverageFrom: [
    "src/**/*",
    "!src/main.ts",
    "!src/App.svelte",
    "!src/components/BasketCounter/*",
    "!src/components/SearchProducts/*",
    "!src/components/Navbar/*",
    "!src/mocks/**/*",
    "!src/routes/**/*",
    "!src/components/Checkout/createCheckoutSession.ts",
    "!src/types/*",
    "!src/libs/requests.ts",
  ],
};
