import * as React from 'react';
import Field from './Field';
import ProtocolAnchor from './ProtocolAnchor';
import {
  Field as ReduxFormField,
  Form,
  InjectedFormProps,
  reduxForm
  } from 'redux-form';
import { IEmployee } from '../interfaces/employee';
import { IUser } from '../interfaces/user';
import { required } from '../validators';

type OwnProps = {
  user?: IUser;
};

type Props = InjectedFormProps<IEmployee, OwnProps> & OwnProps;

const EmployeeForm: React.SFC<Props> = ({
  handleSubmit,
  invalid,
  pristine,
  submitting,
  initialValues,
  user
}) => (
  <Form onSubmit={handleSubmit}>
    <h1>{initialValues.id ? "Edit Employee" : "Add an Employee"}</h1>
    {user && (
      <h3>
        {user.name}
        <br />
        <small>
          <ProtocolAnchor protocol="mailto" value={user.emailAddress} />
        </small>
      </h3>
    )}
    <Field label="Work phone number" name="phone" required />
    <p>
      <label>
        Work email address *<br />
        <ReduxFormField
          name="emailAddress"
          component="input"
          type="email"
          validate={required}
        />
      </label>
    </p>
    <Field label="Job title" name="jobTitle" required />
    <Field label="Comments" name="comments" component="textarea" />
    {initialValues.id && (
      <p>
        <label>
          <ReduxFormField name="isArchived" component="input" type="checkbox" />
          Archived
        </label>
      </p>
    )}
    <p>
      <button type="submit" disabled={invalid || pristine || submitting}>
        Save Employee
      </button>
    </p>
  </Form>
);

export default reduxForm<{}, OwnProps>({ form: "employee" })(EmployeeForm);
