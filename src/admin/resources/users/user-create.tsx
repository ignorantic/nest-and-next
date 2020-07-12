import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
} from 'react-admin';

const validateRequired = required();

const UserCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <TextInput source="firstName" validate={validateRequired} />
      <TextInput source="lastName" validate={validateRequired} />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
