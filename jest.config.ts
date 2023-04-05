
const esModules = ['@react-leaflet', 'react-leaflet'].join('|');
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/__mocks__/fileMock.ts",
    },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  };