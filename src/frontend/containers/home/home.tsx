import React from 'react';
import {
  makeStyles,
  Container,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { NextPage } from 'next';
import NextLink from 'next/link';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(1, 0),
  },
}));

const Home: NextPage = () => {
  const classes = useStyles();

  return (
    <Container>
      <section className={classes.title}>
        <Typography variant="h4">Hello, world!</Typography>
      </section>
      <section>
        <List>
          <ListItem>
            <NextLink href="/posts" passHref shallow><a>Posts</a></NextLink>
          </ListItem>
          <ListItem>
            <NextLink href="/users" passHref shallow><a>Users</a></NextLink>
          </ListItem>
        </List>
      </section>
    </Container>
  );
};

export default Home;
