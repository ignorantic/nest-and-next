import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
} from 'react-admin';

const validateRequired = required();

const PostCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <TextInput source="title" validate={validateRequired} />
      <TextInput source="text" validate={validateRequired} />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Create>
);

export default PostCreate;
