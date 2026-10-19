/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GROK_API_KEY: string;
  readonly VITE_GROK_BASE_URL: string;
  readonly VITE_DEFAULT_MODEL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
