import { Reducer } from 'redux';
import {
  CrudGetListSuccessAction,
  CrudGetMatchingSuccessAction,
  GET_LIST,
} from '../../../actions';
import { Identifier } from '../../../types';

type IdentifierArray = Identifier[];

type State = IdentifierArray;

type ActionTypes =
  | CrudGetListSuccessAction
  | CrudGetMatchingSuccessAction
  | { type: 'OTHER_TYPE'; payload: any; meta: any };

const initialState = [];

const idsReducer: Reducer<State> = (
  previousState = initialState,
  action: ActionTypes,
) => {
  if (action.meta && action.meta.fetchResponse === GET_LIST) {
    return action.payload.data.map(({ id }) => id);
  }
  return previousState;
};

export default idsReducer;
