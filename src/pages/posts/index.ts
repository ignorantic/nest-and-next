import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';

import PostList from '../../frontend/containers/post-list';
import { isCommonPostList } from '../../common/guards';

const PostListPage: NextPage = () => createElement(PostList);

PostListPage.getInitialProps = ({ query }: NextPageContext) => {
  const posts = isCommonPostList(query.payload) ? query.payload : null;
  return {};
};

export default PostListPage;
