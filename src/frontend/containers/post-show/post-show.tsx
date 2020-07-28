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
import { CommonPost } from '../../../common/interfaces';

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
}

const PostShow: NextPage<PostShowProps> = (props) => {
  const { id } = props;

  const {
    record,
  } = useShowController<CommonPost>({
    basePath: '/posts',
    resource: 'posts',
    id,
  });

  const classes = useStyles();

  return (
    <Container>
      <section className={classes.breadcrumbs}>
        <NextLink href="/posts" as="/posts" passHref>
          <Link>Posts</Link>
        </NextLink>
      </section>
      <section className={classes.post}>
        {record && (
          <Fragment>
            <Typography component="h6" variant="h6">
              {`#${record.id}: `}
              {record.title}
            </Typography>
            <Typography>{record.text}</Typography>
          </Fragment>
        )}
      </section>
    </Container>
  );
};

export default PostShow;
