import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { NextPage } from 'next';
import Link from 'next/link';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { values } from 'ramda';
import { compose } from 'redux';
import { CommonPost } from '../../common/interfaces';
import { PostEntity } from '../../frontend/entities';
import {
  crudGetOne,
  registerResource,
} from '../../frontend/lib/redux-resourcify/actions';
import { AppState } from '../../frontend/store/make-store';

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

const propTypes = {
  posts: PropTypes.arrayOf(PropTypes.instanceOf(PostEntity)),
};

const defaultProps = {
  posts: [],
};

const SinglePost: NextPage<IProps> = (props: IProps) => {
  const { posts } = props;
  const classes = useStyles();
  const { query: { id } } = useRouter();
  const dispatch = useDispatch();

  const post = posts.find((item) => Number(item.id) === Number(id));

  useEffect(() => {
    dispatch(
      registerResource({
        name: 'posts',
        options: {},
      }),
    );
    dispatch(
      crudGetOne('posts', String(id), 'posts'),
    );
  }, []);

  return (
    <div>
      <Link href="/posts"><a>Posts</a></Link>
      {post ? (
        <div className={classes.post}>
          <h4 className={classes.title}>
            {post.title}
          </h4>
          <p>{post.text}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

SinglePost.propTypes = propTypes;

SinglePost.defaultProps = defaultProps;

const selectResource = (state: AppState, name: string) => values(state?.resources[name]?.data);

const mapStateToProps = (state) => ({
  posts: selectResource(state, 'posts').map((post) => new PostEntity(post)),
});

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(SinglePost);
