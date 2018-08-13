import * as React from 'react';
import {
  Field,
  Form,
  InjectedFormProps,
  reduxForm
  } from 'redux-form';
import { ICompany } from '../interfaces/company';

const CompanyForm: React.SFC<InjectedFormProps<ICompany>> = ({
  handleSubmit
}) => (
  <Form onSubmit={handleSubmit}>
    <h1>CompanyForm</h1>
    <p>
      <label>
        Name
        <br />
        <Field name="name" component="input" />
      </label>
    </p>
    <p>
      <label>
        Mailing address
        <br />
        <Field name="address" component="textarea" />
      </label>
    </p>
    <p>
      <label>
        Phone number
        <br />
        <Field name="phone" component="input" />
      </label>
    </p>
    <p>
      <button type="submit">Submit</button>
    </p>
  </Form>
);

export default reduxForm({ form: "company" })(CompanyForm);
