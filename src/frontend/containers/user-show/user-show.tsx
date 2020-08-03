import React, { Fragment } from 'react';
import { NextPage } from 'next';
import {
  Container,
  Typography,
  Link,
  makeStyles,
} from '@material-ui/core';
import NextLink from 'next/link';

import { useShowController } from '../../lib/redux-resourcify';
import { CommonUser } from '../../../common/interfaces';

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

interface PostShowProps {
  id?: number;
  user?: CommonUser;
}

const UserShow: NextPage<PostShowProps> = (props) => {
  const { id, user } = props;
  console.log('user', user);

  const {
    record = user,
  } = useShowController<CommonUser>({
    basePath: '/users',
    resource: 'users',
    id,
  });

  const classes = useStyles();

  return (
    <Container>
      <section className={classes.breadcrumbs}>
        <NextLink href="/users" as="/users" passHref>
          <Link>Users</Link>
        </NextLink>
      </section>
      <section className={classes.post}>
        {record && (
          <Fragment>
            <Typography component="h6" variant="h6">
              {`#${record.id}: `}
              {record.firstName}
              {' '}
              {record.lastName}
            </Typography>
            <Typography variant="subtitle1">{record.email}</Typography>
          </Fragment>
        )}
      </section>
    </Container>
  );
};

export default UserShow;
