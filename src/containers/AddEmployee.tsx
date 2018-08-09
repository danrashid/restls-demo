import * as React from 'react';
import EmployeeForm from '../components/EmployeeForm';
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

class AddEmployee extends React.Component<Props> {
  render() {
    return <EmployeeForm />;
  }
}

export default AddEmployee;
