import React from 'react';
import {
  TextField,
  BooleanField,
  Show,
  SimpleShowLayout,
} from 'react-admin';

const UserShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="firstName" />
      <TextField source="lastName" />
      <BooleanField source="isActive" />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
