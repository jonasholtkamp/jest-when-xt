module.exports = {
  testRunner: 'jest',
  mutator: { excludedMutations: ['StringLiteral'] },
  reporters: ['clear-text', 'progress', 'html'],
  mutate: ['src/**/*.js', '!src/**/*.test.js'],
  concurrency: 4
}
