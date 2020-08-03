import React, { useCallback } from 'react';
import {
  Container,
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { NextPage } from 'next';

import { useListController } from '../../lib/redux-resourcify';
import { CommonPost } from '../../../common/interfaces';
import Post from '../../components/post';

const useStyles = makeStyles((theme) => ({
  li: {
    paddingLeft: 0,
    paddingRight: 0,
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
          <ListItem key={post.id} className={classes.li}>
            <Post post={post} />
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
