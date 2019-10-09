/* eslint-disable no-undef */
import axios from 'axios';
import { GET_LOCATION_DATA } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { WeatherAction } from '../types/map.types';

const mapboxApiBase = process.env.REACT_APP_MAPBOX_API_BASE;
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

export interface GetLocationData {
  type: GET_LOCATION_DATA;
  longitude: number;
  latitude: number;
}

export const getLocationData = (
  longitude: number,
  latitude: number
): ThunkAction<Promise<void>, {}, {}, WeatherAction> => async (
  dispatch: ThunkDispatch<{}, {}, WeatherAction>
): Promise<void> => {
  try {
    const res = await axios.get(
      `${mapboxApiBase}/${longitude},${latitude}.json?types=place,country&access_token=${mapboxToken}`
    );

    dispatch({
      type: GET_LOCATION_DATA,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};
