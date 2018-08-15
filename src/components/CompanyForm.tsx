import * as React from 'react';
import Field from './Field';
import {
  Field as ReduxFormField,
  Form,
  InjectedFormProps,
  reduxForm
  } from 'redux-form';
import { ICompany } from '../interfaces/company';

const CompanyForm: React.SFC<InjectedFormProps<ICompany>> = ({
  handleSubmit,
  invalid,
  pristine,
  submitting,
  initialValues
}) => (
  <Form onSubmit={handleSubmit}>
    <h1>{initialValues ? "Edit Company" : "Add a Company"}</h1>
    <Field label="Name" name="name" required />
    <Field
      label="Mailing address"
      name="address"
      component="textarea"
      required
    />
    <Field label="Phone number" name="phone" required />
    {initialValues && (
      <p>
        <label>
          <ReduxFormField name="isArchived" component="input" type="checkbox" />
          Archived
        </label>
      </p>
    )}
    <p>
      <button type="submit" disabled={invalid || pristine || submitting}>
        Save Company
      </button>
    </p>
  </Form>
);

export default reduxForm({ form: "company" })(CompanyForm);
