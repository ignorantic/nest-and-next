import { combineReducers } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './make-store';
import { reducer as resources } from '../lib/redux-resourcify';

const combinedReducer = combineReducers({
  resources,
});

export default (state: AppState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    if (state.resources.needHydrate) {
      const newState = {
        ...state,
        ...action.payload as AppState,
      };
      newState.resources.needHydrate = undefined;
      return newState;
    }
    return { ...state };
  }
  return combinedReducer(state, action);
};
