import('jest').Config
import "@inrupt/jest-jsdom-polyfills"
const config = {
    setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};

module.exports = config;