const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './'
});

/** @type {import('jest').Config} */
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@styles/(.*)$': '<rootDir>/styles/$1',
        '^@themes/(.*)$': '<rootDir>/themes/$1'
    },
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jest-environment-jsdom',
    clearMocks: true
};

module.exports = createJestConfig(customJestConfig);
