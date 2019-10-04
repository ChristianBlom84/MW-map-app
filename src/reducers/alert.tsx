import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState: Array<Alert> = [];

type Alert = {
  id: string;
};

type TypedAction =
  | {
      type: 'SET_ALERT';
      payload: {
        message: string;
        alertType: string;
        id: string;
      };
    }
  | {
      type: 'REMOVE_ALERT';
      payload: {
        messageId: string;
      };
    };

export default function(state = initialState, action: TypedAction) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(
        (alert: Alert) => alert.id !== action.payload.messageId
      );
    default:
      return state;
  }
}
