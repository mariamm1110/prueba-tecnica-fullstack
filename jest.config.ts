export default {
    testEnvironment: "jsdom", // For testing React components
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  };
  