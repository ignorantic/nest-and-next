import React from 'react';
import { NextPage } from 'next';
import {
  Container,
  Link,
  makeStyles,
} from '@material-ui/core';
import NextLink from 'next/link';

import { useShowController } from '../../lib/redux-resourcify';
import { CommonUser } from '../../../common/interfaces';
import User from '../../components/user';

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
      <article>{record && <User user={record} />}</article>
    </Container>
  );
};

export default UserShow;
