import { Reducer } from 'redux';
import { ListParams } from '../../actions';

export const SET_PAGE = 'SET_PAGE';
export const SET_PER_PAGE = 'SET_PER_PAGE';

/**
 * This reducer is for query string, NOT for redux.
 */
const queryReducer: Reducer<ListParams> = (
  previousState,
  { type, payload },
) => {
  switch (type) {
    case SET_PAGE:
      return { ...previousState, page: payload };

    case SET_PER_PAGE:
      return { ...previousState, page: 1, perPage: payload };
    default:
      return previousState;
  }
};

export default queryReducer;
