import * as React from 'react';
import Employee from '../components/Employee';

type OwnProps = {
  match: {
    params: {
      companyId: string;
      employeeId: string;
    };
  };
};

type Props = OwnProps;

class EmployeeContainer extends React.Component<Props> {
  render() {
    return <Employee />;
  }
}

export default EmployeeContainer;
