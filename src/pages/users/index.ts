import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';

import UserList from '../../frontend/containers/user-list';
import { isCommonUserList } from '../../common/guards';
import { CRUD_GET_LIST_SUCCESS, registerResource } from '../../frontend/lib/redux-resourcify';
import { wrapper } from '../../frontend/store';

const UserListPage: NextPage = () => createElement(UserList);

UserListPage.getInitialProps = ({ query, store, res }: NextPageContext) => {
  const isServer = Boolean(res);
  if (isServer) {
    const { data, totalCount } = query;
    const hasData = isCommonUserList(data);
    store.dispatch(registerResource({ name: 'users' }));
    store.dispatch({
      type: CRUD_GET_LIST_SUCCESS,
      payload: {
        data: hasData ? data : [],
        total: totalCount,
      },
      requestPayload: {
        pagination: {
          page: 1,
          perPage: 10,
        },
        sort: {
          field: 'id',
          order: 'ASC',
        },
        filter: {},
      },
      meta: {
        resource: 'users',
        fetchResponse: 'GET_LIST',
        fetchStatus: 'RA/FETCH_END',
      },
    });
  }
  return {};
};

export default wrapper.withRedux(UserListPage);
