/* eslint-disable no-undef */
import axios from 'axios';
import { GET_WEATHER_DATA } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const darkskyToken = process.env.REACT_APP_DARKSKY_TOKEN || '';
const darkskyApiBase = process.env.REACT_APP_DARKSKY_API_BASE || '';
const darkskyOptions =
  '?exclude=currently,minutely,hourly,alerts,flags&units=auto';
const corsProxy = process.env.REACT_APP_CORS_PROXY || '';

export interface GetWeatherData {
  type: GET_WEATHER_DATA;
  longitude: number;
  latitude: number;
}

export const getWeatherData = (
  longitude: number,
  latitude: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  try {
    const res = await axios.get(
      `${corsProxy}${darkskyApiBase}/${darkskyToken}/${latitude},${longitude}/${darkskyOptions}`
    );

    dispatch({
      type: GET_WEATHER_DATA,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};
