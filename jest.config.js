module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },

  setupFiles: ['<rootDir>/src/setupTests.ts'],
};
