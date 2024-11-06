/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECAPTCHA_CLIENT_KEY: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
