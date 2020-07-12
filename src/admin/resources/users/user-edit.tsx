import React from 'react';
import {
  SimpleForm,
  TextInput,
  BooleanInput,
  Edit,
  required,
} from 'react-admin';

const validateRequired = required();

const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm redirect="list">
      <TextInput source="firstName" validate={validateRequired} />
      <TextInput source="lastName" validate={validateRequired} />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
