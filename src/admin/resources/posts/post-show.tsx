import React from 'react';
import {
  TextField,
  BooleanField,
  Show,
  SimpleShowLayout,
} from 'react-admin';

const PostShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="text" />
      <BooleanField source="isActive" />
    </SimpleShowLayout>
  </Show>
);

export default PostShow;
