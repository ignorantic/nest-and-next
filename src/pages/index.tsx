import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';
import { CommonPost } from '../common/interfaces';

const useStyles = makeStyles((theme) => ({
  post: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.grey[500],
    listStyleType: 'none',
  },
  title: {
    color: theme.palette.grey[700],
  },
  error: {
    color: theme.palette.error.main,
  },
}));

function usePosts(): [CommonPost[], string | null] {
  const [posts, setPosts] = useState<CommonPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () => {
      fetch('/api/posts')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response.statusText);
        })
        .then((json) => setPosts(json))
        .catch((err) => setError(err));
    },
    [],
  );

  return [posts, error];
}

const Home: NextPage = () => {
  const [posts, error] = usePosts();
  const classes = useStyles();
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={classes.post}>
            <h4 className={classes.title}>
              <Link href="/post/[id]" as={`/post/${post.id}`} passHref>
                <a>{post.title}</a>
              </Link>
            </h4>
            <p>{post.text}</p>
          </li>
        ))}
      </ul>
      {error && (
      <span className={classes.error}>
        Error:
        {error}
      </span>
      )}
    </div>
  );
};

export default Home;
