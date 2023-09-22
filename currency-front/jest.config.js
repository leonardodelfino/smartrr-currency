// jest.config.js
module.exports = {
    preset: "ts-jest",
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "jsx": "react",
        "esModuleInterop": true,
        // ... other options ...
    },
    "include": ["src/**/*.ts", "src/**/*.tsx"]
};