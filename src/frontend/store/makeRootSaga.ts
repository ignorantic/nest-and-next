import { all, fork } from 'redux-saga/effects';
import { resourceRootSaga, DataProvider } from '../lib/redux-resourcify';

export default function makeRootSaga(dataProvider: DataProvider) {
  return function* rootSaga(): Generator {
    yield all([
      fork(resourceRootSaga(dataProvider)),
    ]);
  };
}
