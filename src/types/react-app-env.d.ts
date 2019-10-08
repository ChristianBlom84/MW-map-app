/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_MAPBOX_TOKEN: string;
    REACT_APP_MAPBOX_API_BASE: string;
    REACT_APP_DARKSKY_TOKEN: string;
    REACT_APP_DARKSKY_API_BASE: string;
    REACT_APP_CORS_PROXY: string;
    REACT_APP_WIKIPEDIA_SUMMARY_BASE_URL: string;
  }
}
