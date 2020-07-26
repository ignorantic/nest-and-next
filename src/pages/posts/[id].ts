import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import PostSingle from '../../frontend/containers/post-single';
import { CommonPost } from '../../common/interfaces';
import { isCommonPost, isID } from '../../common/guards';

interface SinglePostPageProps {
  id: number;
  post: CommonPost;
}

const SinglePostPage: NextPage<SinglePostPageProps> = ({ id, post }) => createElement(
  PostSingle,
  { id, post },
);

SinglePostPage.getInitialProps = ({ query }: NextPageContext) => {
  const id = isID(query.id) ? Number(query.id) : null;
  const post = isCommonPost(query.payload) ? query.payload : null;
  return ({ id, post });
};

export default SinglePostPage;
