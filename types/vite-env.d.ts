// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_PUBLIC_SUPABASE_URL: string;
  VITE_PUBLIC_SUPABASE_ANON_KEY: string;
  VITE_SUPABASE_SERVICE_ROLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
