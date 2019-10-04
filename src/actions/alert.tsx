import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';

export const setAlert = (
  msg: string,
  alertType: string,
  timeOut = 4000
): any => (dispatch: any) => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeOut);
};

export const removeAlert = (id: string) => (dispatch: Dispatch<any>) => {
  dispatch({ type: REMOVE_ALERT, payload: id });
};
