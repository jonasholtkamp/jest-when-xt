module.exports = {
  testRunner: 'jest',
  mutator: { excludedMutations: ['StringLiteral'] },
  reporters: ['clear-text', 'progress', 'html'],
  coverageAnalysis: 'off',
  mutate: ['src/**/*.js', '!src/**/*.test.js'],
  concurrency: 4
}
