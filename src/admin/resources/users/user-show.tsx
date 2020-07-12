import React from 'react';
import {
  TextField,
  BooleanField,
  Show,
  EmailField,
  SimpleShowLayout,
} from 'react-admin';

const UserShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <BooleanField source="isActive" />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
