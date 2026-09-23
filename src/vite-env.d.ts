interface ImportMetaEnv {
    readonly VITE_ENCYCLOPEDIA_API_URL: string;
    readonly VITE_LOGO_API_URL: string;
    readonly VITE_LOGO_PUBLISHABLE_API_KEY: string;
    readonly VITE_TOP_HEADLINES_ENDPOINT_PATH: string;
    readonly VITE_PRIME_UI_LICENSE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
