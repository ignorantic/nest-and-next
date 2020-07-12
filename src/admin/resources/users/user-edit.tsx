import React from 'react';
import {
  SimpleForm,
  TextInput,
  BooleanInput,
  Edit,
  required,
  email,
} from 'react-admin';

const validateRequired = required();
const validateEmail = email();

const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm redirect="list">
      <TextInput source="firstName" validate={validateRequired} />
      <TextInput source="lastName" validate={validateRequired} />
      <TextInput source="email" validate={validateEmail} />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
