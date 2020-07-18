import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { values } from 'ramda';

import { registerResource, crudGetList } from '../../frontend/lib/redux-resourcify/actions';
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

interface IProps {
  posts: CommonPost[];
}

const PostList: NextPage<IProps> = (props) => {
  const { posts } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      registerResource({
        name: 'posts',
        options: {},
      }),
    );
    dispatch(
      crudGetList(
        'posts',
        { page: 1, perPage: 10 },
        { field: 'id', order: 'ASC' },
      ),
    );
  }, []);

  const classes = useStyles();
  return (
    <div>
      <ul>
        {posts.map((post: CommonPost) => (
          <li key={post.id} className={classes.post}>
            <h4 className={classes.title}>
              <Link href="/posts/[id]" as={`/posts/${post.id}`} passHref>
                <a>{post.title}</a>
              </Link>
            </h4>
            <p>{post.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const selectResource = (state, name) => values(state?.resources[name]?.data);

const mapStateToProps = (state) => ({
  posts: selectResource(state, 'posts').map((post) => new PostEntity(post)),
});

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(PostList);
