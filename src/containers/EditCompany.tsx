import * as React from 'react';
import CompanyForm from '../components/CompanyForm';
import { History } from 'history';

type OwnProps = {
  history: History;
  match: {
    params: {
      companyId: string;
    };
  };
};

type Props = OwnProps;

class EditCompany extends React.Component<Props> {
  render() {
    return <CompanyForm />;
  }
}

export default EditCompany;
