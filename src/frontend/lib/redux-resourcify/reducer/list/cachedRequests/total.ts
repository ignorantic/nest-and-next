import { Reducer } from 'redux';

import { CrudGetListSuccessAction, CrudGetMatchingSuccessAction, GET_LIST } from '../../../actions';

type ActionTypes =
  | CrudGetListSuccessAction
  | CrudGetMatchingSuccessAction
  | { type: 'OTHER_TYPE'; payload: any; meta: any };

type State = number;

const initialState = null;

const totalReducer: Reducer<State> = (
  previousState = initialState,
  action: ActionTypes,
) => {
  if (action.meta && action.meta.fetchResponse === GET_LIST) {
    return action.payload.total;
  }
  return previousState;
};

export default totalReducer;
