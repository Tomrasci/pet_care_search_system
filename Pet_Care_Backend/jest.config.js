/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!./knexfile.ts',
    '!src/middleware/authJwt.ts',
    `!src/controllers/user.controller.ts`
  ]
};
