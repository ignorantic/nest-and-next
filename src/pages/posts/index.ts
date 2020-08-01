import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';

import PostList from '../../frontend/containers/post-list';
import { isCommonPostList } from '../../common/guards';
import { CRUD_GET_LIST_SUCCESS, registerResource } from '../../frontend/lib/redux-resourcify';

const PostListPage: NextPage = () => createElement(PostList);

PostListPage.getInitialProps = ({ query, store, res }: NextPageContext) => {
  const isServer = Boolean(res);
  if (isServer) {
    const { data, totalCount } = query;
    const hasData = isCommonPostList(data);
    store.dispatch(registerResource({ name: 'posts' }));
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
        resource: 'posts',
        fetchResponse: 'GET_LIST',
        fetchStatus: 'RA/FETCH_END',
      },
    });
  }
  return {};
};

export default PostListPage;
