import React from 'react';
import {
  TextField,
  BooleanField,
  Datagrid,
  List,
} from 'react-admin';

const PostList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="title" />
      <TextField source="text" />
      <BooleanField source="isActive" />
    </Datagrid>
  </List>
);

export default PostList;
