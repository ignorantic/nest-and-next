import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import { CommonPost } from '../../common/interfaces';
import { PostEntity } from '../../frontend/entities';

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

function usePost(id: number, initialPost?: CommonPost): [CommonPost, string | null] {
  const [post, setPost] = useState<CommonPost | null>(initialPost);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () => {
      if (post === null) {
        fetch(`/api/posts/${id}`).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response.statusText);
        }).then((json) => setPost(json)).catch((err) => setError(err));
      }
    },
    [],
  );

  return [post, error];
}

interface IProps {
  id: number;
  initialPost?: CommonPost;
}

const propTypes = {
  id: PropTypes.number.isRequired,
  initialPost: PropTypes.instanceOf(PostEntity),
};

const defaultProps = {
  initialPost: null,
};

const SinglePost: NextPage<IProps> = ({ id, initialPost }) => {
  const [post, error] = usePost(id, initialPost);
  const classes = useStyles();
  return (
    <div>
      <Link href="/post"><a>Posts</a></Link>
      {post ? (
        <div className={classes.post}>
          <h4 className={classes.title}>
            {post.title}
          </h4>
          <p>{post.text}</p>
        </div>
      ) : (
        <span>Loading...</span>
      )}
      {error && (
      <span className={classes.error}>
        Error:
        {error}
      </span>
      )}
    </div>
  );
};

SinglePost.propTypes = propTypes;

SinglePost.defaultProps = defaultProps;

SinglePost.getInitialProps = async (ctx: NextPageContext): Promise<IProps> => {
  const { query, res } = ctx;
  const isServer = !!res;
  const { id } = query;
  const actualId = Array.isArray(id) ? Number(id[0]) : Number(id);
  if (isServer) {
    const post = await fetch(`http://nn_nginx/api/posts/${actualId}`).then(
      (response): Promise<CommonPost> => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      },
    );
    return Promise.resolve({ id: actualId, initialPost: new PostEntity(post) });
  }
  return Promise.resolve({ id: actualId });
};

export default SinglePost;
