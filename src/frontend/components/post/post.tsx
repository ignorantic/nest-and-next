import React from 'react';
import { NextPage } from 'next';
import {
  Typography, Link, makeStyles,
} from '@material-ui/core';
import NextLink from 'next/link';

import { CommonPost } from '../../../common/interfaces';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.grey[500],
    width: '100%',
  },
}));

interface PostProps {
  post: CommonPost;
}

const Post: NextPage<PostProps> = (props) => {
  const { post } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h6" variant="h6">
        {`#${post.id}: `}
        <NextLink href="/posts/[id]" as={`/posts/${post.id}`} passHref>
          <Link>{post.title}</Link>
        </NextLink>
      </Typography>
      <Typography>
        {'by '}
        <NextLink href="/users/[id]" as={`/users/${post.user.id}`} passHref>
          <Link>
            {post.user.firstName}
            {' '}
            {post.user.lastName}
          </Link>
        </NextLink>
      </Typography>
      <Typography>{post.text}</Typography>
    </div>
  );
};

export default Post;
