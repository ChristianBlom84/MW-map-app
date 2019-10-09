import { combineReducers } from 'redux';
import { Store } from '../types/map.types';
import locationReducer from './location';
import weatherReducer from './weather';
import wikiReducer from './wiki';

export default combineReducers<Store>({
  location: locationReducer,
  weather: weatherReducer,
  wikiSummary: wikiReducer
});
