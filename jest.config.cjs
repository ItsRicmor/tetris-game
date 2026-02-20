module.exports = {
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
