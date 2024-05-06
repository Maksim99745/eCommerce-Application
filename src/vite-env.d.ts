interface ImportMetaEnv {
  readonly CTP_PROJECT_KEY: string;
  readonly CTP_CLIENT_ID: string;
  readonly CTP_CLIENT_SECRET: string;
  readonly CTP_SCOPES: string;
  readonly CTP_AUTH_URL: string;
  readonly CTP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
