const esModules = ['@roxi'].join('|');

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
  testPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: [`node_modules/?!(${esModules})/`], // ignore everything in node_modules but roxi
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
