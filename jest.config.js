module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/tests/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'constants',
    'types',
    'enums',
    'styles',
    'tests',
    'fixtures',
    'src/index.ts',
    'd.ts',
    'index.ts',
    'Styles.ts'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testEnvironmentOptions: {
    customExportConditions: ['']
  },
  setupFiles: ['./jest.polyfills.js']
}
