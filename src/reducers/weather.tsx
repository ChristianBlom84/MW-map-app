import { GET_WEATHER_DATA } from '../actions/types';
import { WeatherData } from '../types/map.types';
import { Reducer } from 'redux';

const initialState: WeatherData = {
  daily: {
    summary: '',
    icon: '',
    data: []
  },
  loading: true
};

type WeatherAction = {
  type: 'GET_WEATHER_DATA';
  payload: WeatherData;
};

const weatherReducer: Reducer<WeatherData, WeatherAction> = (
  state = initialState,
  action
): WeatherData => {
  switch (action.type) {
    case GET_WEATHER_DATA:
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    default:
      return state;
  }
};

export default weatherReducer;
