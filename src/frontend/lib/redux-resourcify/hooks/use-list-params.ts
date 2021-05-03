import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { pipe, path } from 'ramda';
import consolaGlobalInstance from 'consola';

import { ReduxState } from '../types';
import queryReducer, { SET_PAGE, SET_PER_PAGE } from '../reducer/list/query-reducer';
import {
  registerResource,
  crudGetList,
  changeListParams,
  ListParams,
} from '../actions';
import { isPage } from '../../../../common/guards';

const defaultParams: ListParams = {
  page: 1,
  perPage: 10,
};

interface ListParamsOptions {
  basePath: string;
  resource: string;
  perPage?: number;
}

interface Modifiers {
  page: number;
  changeParams: (action: unknown) => void;
  setPage: (page: number) => void;
  setPerPage: (pageSize: number) => void;
}

const useListParams = ({
  basePath,
  resource,
  perPage = 10,
}: ListParamsOptions): Modifiers => {
  const router = useRouter();
  const dispatch = useDispatch();

  const params: ListParams = useSelector((reduxState: ReduxState) => (reduxState.resources[resource]
    ? reduxState.resources[resource].list.params
    : defaultParams), shallowEqual);

  const requestSignature = [
    resource,
    params,
    perPage,
  ];

  const query = {
    ...params,
    perPage,
  };

  const changeParams = useCallback((action) => {
    const newParams = queryReducer(query, action);
    const asPath = newParams.page === 1 ? basePath : `${basePath}?page=${newParams.page}`;
    router.push(basePath, asPath, { shallow: true })
      .then(() => {
        dispatch(crudGetList(resource, { page: newParams.page, perPage }, { field: 'id', order: 'ASC' }));
      })
      .catch(() => {
        consolaGlobalInstance.error('Error while trying to redirect');
      })
      .finally(() => {
        dispatch(changeListParams(resource, newParams));
      });
  }, requestSignature);

  const setPage = useCallback(
    (newPage: number) => changeParams({ type: SET_PAGE, payload: newPage }),
    requestSignature,
  );

  const setPerPage = useCallback(
    (newPerPage: number) => changeParams({ type: SET_PER_PAGE, payload: newPerPage }),
    requestSignature,
  );

  const isRegistered = useSelector(pipe(path(['resources', resource]), Boolean));
  useEffect(() => {
    const initialPage = isPage(router.query.page)
      ? Number(router.query.page)
      : query.page;
    setPage(initialPage);
    if (!isRegistered) {
      dispatch(registerResource({ name: resource, options: {} }));
    }
  }, []);

  return {
    ...query,
    changeParams,
    setPage,
    setPerPage,
  };
};

export default useListParams;
