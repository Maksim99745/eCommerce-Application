export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  globals: { fetch },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    CTP_PROJECT_KEY: '',
                    CTP_CLIENT_ID: '',
                    CTP_CLIENT_SECRET: '',
                    CTP_SCOPES: '',
                    CTP_AUTH_URL: '',
                    CTP_API_URL: '',
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@preact(/(.*)|$)': '@preact$1',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/mocks/mocks.js',
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@enums/(.*)': '<rootDir>/src/enums/$1',
    '@constants/(.*)': '<rootDir>/src/constants/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@test/(.*)': '<rootDir>/src/test/$1',
  },
};
