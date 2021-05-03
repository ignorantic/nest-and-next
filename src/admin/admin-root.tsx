import React, { Fragment } from 'react';
import { Admin, Resource } from 'react-admin';
import { NoSsr, CssBaseline } from '@material-ui/core';
import crudProvider from '@fusionworks/ra-data-nest-crud';
import * as users from './resources/users';
import * as posts from './resources/posts';
import { DataProvider } from '../frontend/lib/redux-resourcify';

const dataProvider = crudProvider('http://localhost/api') as DataProvider;

const AdminRoot = () => (
  <Fragment>
    <CssBaseline />
    <NoSsr fallback="Loading...">
      <Admin dataProvider={dataProvider}>
        <Resource name="users" {...users} />
        <Resource name="posts" {...posts} />
      </Admin>
    </NoSsr>
  </Fragment>
);

export default AdminRoot;
