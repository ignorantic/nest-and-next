import React, { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import {
  Container, Link, List, ListItem, makeStyles, Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}));

interface InitialPostListProps {
  posts?: CommonPost[];
  page: number;
}

interface PostListProps {
  posts: CommonPost[];
  page: number;
}

const PostList: NextPage<PostListProps> = (props) => {
  const { posts, page } = props;
  const [currentPage, setCurrentPage] = useState(page || 1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      registerResource({
        name: 'posts',
        options: {},
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      crudGetList(
        'posts',
        { page: currentPage, perPage: 10 },
        { field: 'id', order: 'ASC' },
      ),
    );
  }, [currentPage]);

  const classes = useStyles();

  const handlePageChange = useCallback((event, pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  return (
    <Container>
      <List>
        {posts?.map((post: CommonPost) => (
          <ListItem key={post.id} className={classes.post}>
            <div>
              <Typography component="h6" variant="h6">
                #
                {post.id}
                {': '}
                <NextLink href="/posts/[id]" as={`/posts/${post.id}`} passHref>
                  <Link>{post.title}</Link>
                </NextLink>
              </Typography>
              <Typography>{post.text}</Typography>
            </div>
          </ListItem>
        ))}
      </List>
      <div className={classes.pagination}>
        <Pagination
          count={10}
          color="primary"
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </Container>
  );
};

const selectResource = (state: AppState, name: string) => values(state?.resources[name]?.data);

const mapStateToProps = (state: AppState, { posts, page }: InitialPostListProps) => {
  const postsFromStore = selectResource(state, 'posts') as CommonPost[];
  const postEntities = postsFromStore.length ? postsFromStore : posts;
  return ({
    posts: postEntities?.map((post) => new PostEntity(post)),
    page,
  });
};

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(PostList);
