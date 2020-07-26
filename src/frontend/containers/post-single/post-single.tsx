import React, { useEffect, Fragment } from 'react';
import { NextPage } from 'next';
import {
  Container, Link, makeStyles, Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';

import { CommonPost } from '../../../common/interfaces';
import { registerResource, crudGetOne } from '../../lib/redux-resourcify/actions';
import { PostEntity } from '../../entities';
import { AppState } from '../../store/make-store';

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  post: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.grey[500],
    listStyleType: 'none',
  },
}));

interface InitialSinglePostProps {
  id?: number;
  post?: CommonPost;
}

interface SinglePostProps {
  id: number;
  post?: CommonPost;
}

const PostSingle: NextPage<SinglePostProps> = (props) => {
  const { id, post } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      registerResource({
        name: 'posts',
        options: {},
      }),
    );
    dispatch(
      crudGetOne('posts', String(id), 'posts'),
    );
  }, [id]);

  const classes = useStyles();

  return (
    <Container>
      <section className={classes.breadcrumbs}>
        <NextLink href="/posts/" as="/posts/" passHref>
          <Link>Posts</Link>
        </NextLink>
      </section>
      <section className={classes.post}>
        {post && (
          <Fragment>
            <Typography component="h6" variant="h6">
              <NextLink href="/posts/[id]" as={`/posts/${post.id}`} passHref>
                <Link>{post.title}</Link>
              </NextLink>
            </Typography>
            <Typography>{post.text}</Typography>
          </Fragment>
        )}
      </section>
    </Container>
  );
};

const selectResource = (
  state: AppState,
  name: string,
  id: number,
) => state?.resources[name]?.data[id];

const mapStateToProps = (state: AppState, { id, post }: InitialSinglePostProps) => {
  const postFromStore = selectResource(state, 'posts', id) as CommonPost;
  const postEntity = postFromStore || post;
  return ({
    post: postEntity && new PostEntity(postEntity),
  });
};

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(PostSingle);
