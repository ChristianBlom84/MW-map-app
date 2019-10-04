/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_MAPBOX_TOKEN: string;
    REACT_APP_MAPBOX_API_BASE: string;
  }
}
