import React from 'react';
import { NextPage } from 'next';
import {
  Typography, makeStyles, Link,
} from '@material-ui/core';

import NextLink from 'next/link';
import { CommonUser } from '../../../common/interfaces';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.grey[500],
    width: '100%',
  },
}));

interface PostShowProps {
  user: CommonUser;
}

const User: NextPage<PostShowProps> = (props) => {
  const { user } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
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
      <Typography variant="caption">{user.email}</Typography>
    </div>
  );
};

export default User;
