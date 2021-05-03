import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import PostShow from '../../frontend/containers/post-show';
import { isCommonPost, isID } from '../../common/guards';
import { wrapper } from '../../frontend/store';
import { CommonPost } from '../../common/interfaces';

interface PostShowPageProps {
  id: number;
  post?: CommonPost;
}

const PostShowPage: NextPage<PostShowPageProps> = ({ id, post }) => createElement(
  PostShow,
  { id, post },
);

PostShowPage.getInitialProps = ({ query }: NextPageContext) => {
  const id = isID(query.id) ? Number(query.id) : null;
  const post = isCommonPost(query.data) ? query.data : null;
  return ({ id, post });
};

export default wrapper.withRedux(PostShowPage);
