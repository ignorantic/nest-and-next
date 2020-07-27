import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import PostShow from '../../frontend/containers/post-show';
import { isCommonPost, isID } from '../../common/guards';

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

export default PostShowPage;
