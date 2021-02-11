module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': 'svelte-jester',
    "^.+\\.ts$": "ts-jest",
    "^.+\\.(css|less|scss)$": "babel-jest"

  },
  moduleFileExtensions: [
    "html",
    'ts',
    'js',
    'mjs',
    'svelte',
  ],
  verbose: true,
  testPathIgnorePatterns: ["node_modules"],
  transformIgnorePatterns: ["node_modules"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
  } 
};
