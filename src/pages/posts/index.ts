import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';

import PostList from '../../frontend/containers/post-list';
import { CommonPost } from '../../common/interfaces';
import { isCommonPostList, isPage } from '../../common/guards';

interface PostListPageProps {
  posts: CommonPost[];
  page: number;
}

const PostListPage: NextPage<PostListPageProps> = ({ posts, page }) => createElement(
  PostList,
  { posts, page },
);

PostListPage.getInitialProps = ({ query }: NextPageContext) => {
  const posts = isCommonPostList(query.payload) ? query.payload : null;
  const page = isPage(query.page) ? Number(query.page) : 1;
  return { posts, page };
};

export default PostListPage;
