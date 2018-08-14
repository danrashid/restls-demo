import * as React from 'react';
import {
  Field,
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
          <a href={`mailto:${user.emailAddress}`}>{user.emailAddress}</a>
        </small>
      </h3>
    )}
    <p>
      <label>
        Work phone number *<br />
        <Field name="phone" component="input" validate={required} />
      </label>
    </p>
    <p>
      <label>
        Work email address *<br />
        <Field
          name="emailAddress"
          component="input"
          type="email"
          validate={required}
        />
      </label>
    </p>
    <p>
      <label>
        Job Title
        <br />
        <Field name="jobTitle" component="input" />
      </label>
    </p>
    <p>
      <label>
        Comments
        <br />
        <Field name="comments" component="textarea" />
      </label>
    </p>
    {initialValues.id && (
      <p>
        <label>
          <Field name="isArchived" component="input" type="checkbox" />
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
