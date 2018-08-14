import * as React from 'react';
import {
  Field,
  Form,
  InjectedFormProps,
  reduxForm
  } from 'redux-form';
import { ICompany } from '../interfaces/company';
import { required } from '../validators';

const CompanyForm: React.SFC<InjectedFormProps<ICompany>> = ({
  handleSubmit,
  invalid,
  pristine,
  submitting,
  initialValues
}) => (
  <Form onSubmit={handleSubmit}>
    <h1>CompanyForm</h1>
    <p>
      <label>
        Name *<br />
        <Field name="name" component="input" validate={required} />
      </label>
    </p>
    <p>
      <label>
        Mailing address *<br />
        <Field name="address" component="textarea" validate={required} />
      </label>
    </p>
    <p>
      <label>
        Phone number *<br />
        <Field name="phone" component="input" validate={required} />
      </label>
    </p>
    {initialValues && (
      <p>
        <label>
          <Field name="isArchived" component="input" type="checkbox" />
          Archive
        </label>
      </p>
    )}
    <p>
      <button type="submit" disabled={invalid || pristine || submitting}>
        Submit
      </button>
    </p>
  </Form>
);

export default reduxForm({ form: "company" })(CompanyForm);
