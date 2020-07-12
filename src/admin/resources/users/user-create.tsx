import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
  email,
} from 'react-admin';

const validateRequired = required();
const validateEmail = email();

const UserCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <TextInput source="firstName" validate={validateRequired} />
      <TextInput source="lastName" validate={validateRequired} />
      <TextInput source="email" validate={validateEmail} />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
