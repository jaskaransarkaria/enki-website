const esModules = ['@roxi', 'lodash-es'].join('|');

module.exports = {
  transform: {
    '^.+@roxi.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'mjs', 'svelte'],
  verbose: true,
  testPathIgnorePatterns: ['node_modules', 'createCheckoutSession.ts'],
  transformIgnorePatterns: [`node_modules/?!(${esModules})/`], // ignore everything in node_modules but roxi
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^lodash-es$': 'lodash',
  },
  collectCoverageFrom: [
    'src/**/*',
    '!src/main.ts',
    '!src/App.svelte',
    '!src/components/BasketCounter/*',
    '!src/components/SearchProducts/*',
    '!src/components/Navbar/*',
    '!src/mocks/**/*',
    '!src/pages/**/*',
    '!src/components/Checkout/createCheckoutSession.ts',
    '!src/types/*',
    '!src/libs/requests.ts',
  ],
};
