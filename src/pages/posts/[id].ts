import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import PostShow from '../../frontend/containers/post-show';
import { isCommonPost, isID } from '../../common/guards';
import { wrapper } from '../../frontend/store';

interface PostShowPageProps {
  id: number;
}

const PostShowPage: NextPage<PostShowPageProps> = ({ id }) => createElement(
  PostShow,
  { id },
);

PostShowPage.getInitialProps = ({ query }: NextPageContext) => {
  const id = isID(query.id) ? Number(query.id) : null;
  const post = isCommonPost(query.payload) ? query.payload : null;
  return ({ id });
};

export default wrapper.withRedux(PostShowPage);
