import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import PostSingle from '../../frontend/containers/post-single';
import { CommonPost } from '../../common/interfaces';

interface SinglePostPageProps {
  id: number;
  post: CommonPost;
}

const SinglePostPage: NextPage<SinglePostPageProps> = ({ id, post }) => createElement(
  PostSingle,
  { id, post },
);

SinglePostPage.getInitialProps = ({ query }: NextPageContext) => {
  const id = isNumber(query.id) ? query.id : null;
  const post = isCommonPost(query.payload) ? query.payload : null;
  return ({ id, post });
};

export default SinglePostPage;

function isNumber(id: unknown): id is number {
  return typeof id === 'number';
}

function isCommonPost(post: unknown): post is CommonPost {
  if (typeof post === 'object') {
    return typeof (post as CommonPost).id === 'number';
  }
  return false;
}
