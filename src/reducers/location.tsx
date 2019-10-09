import { GET_LOCATION_DATA } from '../actions/types';
import { Location } from '../types/map.types';
import { Reducer } from 'redux';
import { WeatherAction } from '../types/map.types';

const initialState: Location = {
  loading: true,
  data: {
    type: '',
    query: [],
    features: []
  }
};

const locationReducer: Reducer<Location, WeatherAction> = (
  state = initialState,
  action
): Location => {
  switch (action.type) {
    case GET_LOCATION_DATA:
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    default:
      return state;
  }
};

export default locationReducer;
