import { all } from 'redux-saga/effects';
import { DataProvider } from '../types';
import fetchSaga from './fetch-saga';

/**
 * @param {Object} dataProvider A Data Provider function
 // * @param {Function} authProvider An Authentication Provider object
 */
export default (
  dataProvider: DataProvider,
  // authProvider: AuthProvider | null
) => function* resources() {
  yield all([
    // auth(authProvider)(),
    // undo(),
    fetchSaga(dataProvider)(),
    // accumulate(),
    // redirection(),
    // refresh(),
    // notification(),
    // callback(),
  ]);
};
