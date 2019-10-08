export interface WikiData {
  data: {
    query: {
      search: object[];
    };
  };
}

export interface WikiSummary {
  type: string;
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
  description: string;
  extract: string;
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
}

export interface WeatherData {
  daily: {
    summary: string;
    icon: string;
    data: WeatherDataDaily[];
  };
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
