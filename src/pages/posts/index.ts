import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';

import PostList from '../../frontend/containers/post-list';
import { CommonPost } from '../../common/interfaces';
import { isCommonPostList } from '../../common/guards';

interface PostListPageProps {
  posts: CommonPost[];
}

const PostListPage: NextPage<PostListPageProps> = ({ posts }) => createElement(
  PostList,
  { posts },
);

PostListPage.getInitialProps = ({ query }: NextPageContext) => {
  const posts = isCommonPostList(query.payload) ? query.payload : null;
  return { posts };
};

export default PostListPage;
