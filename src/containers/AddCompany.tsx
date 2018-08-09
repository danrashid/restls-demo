import * as React from 'react';
import CompanyForm from '../components/CompanyForm';
import { History } from 'history';

type OwnProps = {
  history: History;
};

type Props = OwnProps;

class AddCompany extends React.Component<Props> {
  render() {
    return <CompanyForm />;
  }
}

export default AddCompany;
