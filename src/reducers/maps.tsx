import { GET_MAP } from '../actions/types';

interface Action {
  type: string;
  payload: any;
}

type TypedAction =
  | {
      type: 'addMessage';
      payload: {
        message: string;
      };
    }
  | {
      type: 'removeMessage';
      payload: {
        messageId: number;
      };
    };

const initialState: object = {
  loading: true
};

export default function(state: object = initialState, action: TypedAction) {
  switch (action.type) {
    default:
      return state;
  }
}
