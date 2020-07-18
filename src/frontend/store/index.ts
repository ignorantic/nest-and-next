import { createStore, applyMiddleware } from 'redux';
import {
  MakeStore, createWrapper, Context,
} from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import makeRootSaga from './makeRootSaga';
import dataProvider from '../data-provider';

interface Resource {
  props: {[key: string]: object | string | boolean};
  data: {[key: number]: object};
  list: {[key: string]: object | number[] | number | boolean};
}

export interface State {
  readonly resources: {[key: string]: Resource};
}

// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) => {
  const saga = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(saga, thunk)),
  );

  const rootSaga = makeRootSaga(dataProvider);
  saga.run(rootSaga);
  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: false });
