import React, { useEffect } from 'react';
import { NextPage } from 'next';
import {
  Container, Link, List, ListItem, makeStyles, Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { values } from 'ramda';

import { CommonPost } from '../../../common/interfaces';
import { registerResource, crudGetList } from '../../lib/redux-resourcify/actions';
import { PostEntity } from '../../entities';
import { AppState } from '../../store/make-store';

const useStyles = makeStyles((theme) => ({
  post: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.grey[500],
    listStyleType: 'none',
  },
}));

interface InitialPostListProps {
  posts?: CommonPost[];
}

interface PostListProps {
  posts: CommonPost[];
}

const PostList: NextPage<PostListProps> = (props) => {
  const { posts } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      registerResource({
        name: 'posts',
        options: {},
      }),
    );
    dispatch(
      crudGetList(
        'posts',
        { page: 1, perPage: 10 },
        { field: 'id', order: 'ASC' },
      ),
    );
  }, []);

  const classes = useStyles();

  return (
    <Container>
      <List>
        {posts.map((post: CommonPost) => (
          <ListItem key={post.id} className={classes.post}>
            <div>
              <Typography component="h6" variant="h6">
                <NextLink href="/posts/[id]" as={`/posts/${post.id}`} passHref>
                  <Link>{post.title}</Link>
                </NextLink>
              </Typography>
              <Typography>{post.text}</Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

const selectResource = (state: AppState, name: string) => values(state?.resources[name]?.data);

const mapStateToProps = (state: AppState, { posts }: InitialPostListProps) => {
  const postsFromStore = selectResource(state, 'posts') as CommonPost[];
  const postEntities = postsFromStore.length ? postsFromStore : posts;
  return ({
    posts: postEntities.map((post) => new PostEntity(post)),
  });
};

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(PostList);
