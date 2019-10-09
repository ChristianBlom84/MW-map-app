/* eslint-disable no-undef */
import axios from 'axios';
import { GET_WIKI_SUMMARY } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const wikiUrl = process.env.REACT_APP_WIKIPEDIA_SUMMARY_BASE_URL || '';
const wikiRelatedUrl = process.env.REACT_APP_WIKIPEDIA_RELATED_BASE_URL || '';

export interface GetWikiSummary {
  type: GET_WIKI_SUMMARY;
  wikiTitle: string;
}

export const getWikiSummary = (
  wikiTitle: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  try {
    const searchResult = await axios.get(`${wikiUrl}/${wikiTitle}`);

    if (searchResult.data.type === 'disambiguation') {
      const relatedData = await axios.get(`${wikiRelatedUrl}/${wikiTitle}`);

      dispatch({
        type: GET_WIKI_SUMMARY,
        payload: relatedData.data.pages[0]
      });
    }

    dispatch({
      type: GET_WIKI_SUMMARY,
      payload: searchResult.data
    });
  } catch (err) {
    console.error(err);
  }
};
