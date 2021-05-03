import React from 'react';
import {
  SimpleForm,
  TextInput,
  BooleanInput,
  Edit,
  required,
} from 'react-admin';

const validateRequired = required();

const PostEdit = props => (
  <Edit {...props}>
    <SimpleForm redirect="list">
      <TextInput source="title" validate={validateRequired} />
      <TextInput source="text" validate={validateRequired} />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Edit>
);

export default PostEdit;
