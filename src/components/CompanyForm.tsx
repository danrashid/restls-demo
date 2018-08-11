import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import {
    Field,
    Form,
    InjectedFormProps,
    reduxForm
    } from 'redux-form';
import { ICompany } from '../interfaces/company';

const CompanyForm: React.SFC<InjectedFormProps<ICompany>> = props => (
  <React.Fragment>
    <Typography>CompanyForm</Typography>
    <Form>
      <p>
        <Field name="name" component="input" />
      </p>
    </Form>
  </React.Fragment>
);

export default reduxForm({ form: "company" })(CompanyForm);
