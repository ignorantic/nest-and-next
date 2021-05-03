import React from 'react';
import { NextPage } from 'next';
import {
  Container,
  Link,
  makeStyles,
} from '@material-ui/core';
import NextLink from 'next/link';

import { useShowController } from '../../lib/redux-resourcify';
import { CommonPost } from '../../../common/interfaces';
import Post from '../../components/post';

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));

interface PostShowProps {
  id?: number;
  post?: CommonPost;
}

const PostShow: NextPage<PostShowProps> = (props) => {
  const { id, post } = props;

  const {
    record = post,
  } = useShowController<CommonPost>({
    basePath: '/posts',
    resource: 'posts',
    id,
  });

  const classes = useStyles();

  return (
    <Container>
      <section className={classes.breadcrumbs}>
        <NextLink href="/posts" as="/posts" passHref>
          <Link>Posts</Link>
        </NextLink>
      </section>
      <article>{record && <Post post={record} />}</article>
    </Container>
  );
};

export default PostShow;
