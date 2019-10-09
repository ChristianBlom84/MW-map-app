import { GET_WIKI_SUMMARY } from '../actions/types';
import { WikiSummary } from '../types/map.types';
import { Reducer } from 'redux';

const initialState: WikiSummary = {
  type: '',
  thumbnail: {
    source: '',
    width: 0,
    height: 0
  },
  description: '',
  extract: '',
  loading: true
};

type WikiAction = {
  type: 'GET_WIKI_SUMMARY';
  payload: WikiSummary;
};

const wikiReducer: Reducer<WikiSummary, WikiAction> = (
  state = initialState,
  action
): WikiSummary => {
  switch (action.type) {
    case GET_WIKI_SUMMARY:
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    default:
      return state;
  }
};

export default wikiReducer;
