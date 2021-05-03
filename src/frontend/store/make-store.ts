import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { Context, MakeStore } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import makeRootSaga from './make-root-saga';
import dataProvider from '../data-provider';
import rootReducer from './root-reducer';
import { CommonPost } from '../../common/interfaces';

interface Resource {
  props: {[key: string]: Record<string, unknown> | string | boolean};
  data: {[key: number]: Record<string, unknown> | CommonPost};
  list: {[key: string]: Record<string, unknown> | number[] | number | boolean};
}

export interface AppState {
  readonly resources: {[key: string]: Resource};
}

const makeStore: MakeStore<AppState> = (context: Context) => {
  const saga = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(saga, thunk)),
  );

  const rootSaga = makeRootSaga(dataProvider);
  saga.run(rootSaga);
  return store;
};

export default makeStore;
