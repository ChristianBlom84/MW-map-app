export interface WikiSummary {
  type: string;
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
  description: string;
  extract: string;
  loading?: boolean;
}

export interface FeatureObject {
  text: string;
}

export interface Location {
  data: {
    type: string;
    query: number[];
    features: FeatureObject[];
  };
  loading?: boolean;
}

export interface WeatherData {
  daily: {
    summary: string;
    icon: string;
    data: WeatherDataDaily[];
  };
  loading?: boolean;
}

interface WeatherDataDaily {
  time: number;
  summary: string;
  icon: string;
  temperatureHigh: number;
  temperatureLow: number;
  precipProbability: number;
  precipType: string;
}

export interface Store {
  location: Location;
  weather: WeatherData;
  wikiSummary: WikiSummary;
}

// Action types

export type WeatherAction = {
  type: 'GET_LOCATION_DATA';
  payload: Location;
};
