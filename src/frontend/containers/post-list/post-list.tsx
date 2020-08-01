import React, { useCallback } from 'react';
import {
  Container,
  Link,
  List,
  ListItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { NextPage } from 'next';
import NextLink from 'next/link';

import { useListController } from '../../lib/redux-resourcify';
import { CommonPost } from '../../../common/interfaces';

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

const PostList: NextPage = () => {
  const classes = useStyles();

  const {
    page,
    setPage,
    perPage,
    data,
    total,
  } = useListController<CommonPost>({
    resource: 'posts',
    basePath: '/posts',
  });

  const pageCount = Math.ceil(total / perPage);

  const handlePageChange = useCallback((event, pageNumber) => {
    setPage(pageNumber);
  }, []);

  return (
    <Container>
      <List>
        {data?.map((post: CommonPost) => (
          <ListItem key={post.id} className={classes.post}>
            <div>
              <Typography component="h6" variant="h6">
                {`#${post.id}: `}
                <NextLink href="/posts/[id]" as={`/posts/${post.id}`} passHref>
                  <Link>{post.title}</Link>
                </NextLink>
                {` ${post.user?.firstName} ${post.user?.lastName}`}
              </Typography>
              <Typography>{post.text}</Typography>
            </div>
          </ListItem>
        ))}
      </List>
      <div className={classes.pagination}>
        <Pagination
          count={pageCount}
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </Container>
  );
};

export default PostList;
