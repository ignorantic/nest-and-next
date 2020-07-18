import {
  all,
  call,
  cancelled,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { DataProvider } from '../types';
import {
  FETCH_CANCEL,
  FETCH_END,
  FETCH_ERROR,
  FETCH_START,
  fetchActionsWithRecordResponse,
  fetchActionsWithArrayOfIdentifiedRecordsResponse,
  fetchActionsWithArrayOfRecordsResponse,
  fetchActionsWithTotalResponse,
  sanitizeFetchType,
} from '../actions';

function validateResponseFormat(
  response,
  type,
  logger = console.error, // eslint-disable-line no-console
) {
  if (!response.hasOwnProperty('data')) {
    logger(
      `The response to '${type}' must be like { data: ... }, but the received response does not have a 'data' key. The dataProvider is probably wrong for '${type}'.`,
    );
    throw new Error('ra.notification.data_provider_error');
  }
  if (
    fetchActionsWithArrayOfRecordsResponse.includes(type)
    && !Array.isArray(response.data)
  ) {
    logger(
      `The response to '${type}' must be like { data : [...] }, but the received data is not an array. The dataProvider is probably wrong for '${type}'`,
    );
    throw new Error('ra.notification.data_provider_error');
  }
  if (
    fetchActionsWithArrayOfIdentifiedRecordsResponse.includes(type)
    && Array.isArray(response.data)
    && response.data.length > 0
    && response.data.some((d) => !d.hasOwnProperty('id'))
  ) {
    logger(
      `The response to '${type}' must be like { data : [{ id: 123, ...}, ...] }, but at least one received data item do not have an 'id' key. The dataProvider is probably wrong for '${type}'`,
    );
    throw new Error('ra.notification.data_provider_error');
  }
  if (
    fetchActionsWithRecordResponse.includes(type)
    && !response.data.hasOwnProperty('id')
  ) {
    logger(
      `The response to '${type}' must be like { data: { id: 123, ... } }, but the received data does not have an 'id' key. The dataProvider is probably wrong for '${type}'`,
    );
    throw new Error('ra.notification.data_provider_error');
  }
  if (
    fetchActionsWithTotalResponse.includes(type)
    && !response.hasOwnProperty('total')
  ) {
    logger(
      `The response to '${type}' must be like  { data: [...], total: 123 }, but the received response does not have a 'total' key. The dataProvider is probably wrong for '${type}'`,
    );
    throw new Error('ra.notification.data_provider_error');
  }
}

interface ActionWithSideEffect {
  type: string;
  payload: any;
  meta: {
    fetch: string;
    resource: string;
    onSuccess?: any;
    onFailure?: any;
  };
}

export function* handleFetch(
  dataProvider: DataProvider,
  action: ActionWithSideEffect,
) {
  const {
    type,
    payload,
    meta: {
      fetch: fetchMeta, onSuccess, onFailure, ...meta
    },
  } = action;
  const restType = fetchMeta;
  const successSideEffects = onSuccess instanceof Function ? {} : onSuccess;
  const failureSideEffects = onFailure instanceof Function ? {} : onFailure;

  try {
    yield all([
      put({ type: `${type}_LOADING`, payload, meta }),
      put({ type: FETCH_START }),
    ]);
    const response = yield call(
      dataProvider[sanitizeFetchType(restType)],
      meta.resource,
      payload,
    );
    if (process.env.NODE_ENV !== 'production') {
      validateResponseFormat(response, restType);
    }
    yield put({
      type: `${type}_SUCCESS`,
      payload: response,
      requestPayload: payload,
      meta: {
        ...meta,
        ...successSideEffects,
        fetchResponse: restType,
        fetchStatus: FETCH_END,
      },
    });
    yield put({ type: FETCH_END });
  } catch (error) {
    yield put({
      type: `${type}_FAILURE`,
      error: error.message ? error.message : error,
      payload: error.body ? error.body : null,
      requestPayload: payload,
      meta: {
        ...meta,
        ...failureSideEffects,
        fetchResponse: restType,
        fetchStatus: FETCH_ERROR,
      },
    });
    yield put({ type: FETCH_ERROR, error });
  } finally {
    if (yield cancelled()) {
      yield put({ type: FETCH_CANCEL });
    }
  }
}

export const takeFetchAction = (action) => action.meta && action.meta.fetch;

const fetchSaga = (dataProvider: DataProvider) => function* watchFetch() {
  yield takeEvery(takeFetchAction, handleFetch, dataProvider);
};

export default fetchSaga;
