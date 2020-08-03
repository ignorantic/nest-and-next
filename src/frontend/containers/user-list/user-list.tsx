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
import { CommonUser } from '../../../common/interfaces';

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
          <ListItem key={user.id} className={classes.post}>
            <div>
              <Typography component="h6" variant="h6">
                {`#${user.id}: `}
                <NextLink href="/users/[id]" as={`/users/${user.id}`} passHref>
                  <Link>
                    {user.firstName}
                    {' '}
                    {user.lastName}
                  </Link>
                </NextLink>
              </Typography>
              <Typography>{user.email}</Typography>
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

export default UserList;
