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
import { CommonUser } from '../../../common/interfaces';
import User from '../../components/user';

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

const UserList: NextPage = () => {
  const classes = useStyles();

  const {
    page,
    setPage,
    perPage,
    data,
    total,
  } = useListController<CommonUser>({
    resource: 'users',
    basePath: '/users',
  });

  const pageCount = Math.ceil(total / perPage);

  const handlePageChange = useCallback((event, pageNumber) => {
    setPage(pageNumber);
  }, []);

  return (
    <Container>
      <List>
        {data?.map((user: CommonUser) => (
          <ListItem key={user.id} className={classes.li}>
            <User user={user} />
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

export default UserList;
