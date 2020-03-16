module.exports = {
  testRunner: 'jest',
  testFramework: 'jest',
  mutator: { name: 'javascript', excludedMutations: ['StringLiteral'] },
  transpilers: [],
  reporters: ['clear-text', 'progress', 'html'],
  coverageAnalysis: 'off',
  mutate: ['src/**/*.js', '!src/**/*.test.js'],
  maxConcurrentTestRunners: 4
}
