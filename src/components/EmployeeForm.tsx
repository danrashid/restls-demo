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
  users?: IUser[];
};

type Props = InjectedFormProps<IEmployee, OwnProps> & OwnProps;

const EmployeeForm: React.SFC<Props> = ({
  handleSubmit,
  invalid,
  pristine,
  submitting,
  initialValues,
  users
}) => (
  <Form onSubmit={handleSubmit}>
    <h1>{initialValues.id ? "Edit Employee" : "Add an Employee"}</h1>
    {users && (
      <p>
        <label>
          Select a User *<br />
          <Field name="userId" component="select" validate={required}>
            <option />
            {users.map(({ id, name, emailAddress }) => (
              <option key={id} value={id}>
                {name} ({emailAddress})
              </option>
            ))}
          </Field>
        </label>
      </p>
    )}
    <p>
      <label>
        Phone number *<br />
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
