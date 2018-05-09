module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/requestAdapters/browser.js"
  ],
  coverageReporters: ["lcov", "json"]
}