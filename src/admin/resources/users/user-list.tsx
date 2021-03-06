import React from 'react';
import {
  TextField,
  BooleanField,
  EmailField,
  Datagrid,
  List,
} from 'react-admin';

const UserList = props => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <BooleanField source="isActive" />
    </Datagrid>
  </List>
);

export default UserList;
