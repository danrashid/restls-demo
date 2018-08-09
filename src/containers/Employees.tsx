import * as React from 'react';
import Employees from '../components/Employees';

type OwnProps = {
  match: {
    params: {
      companyId: string;
    };
  };
};

type Props = OwnProps;

class EmployeesContainer extends React.Component<Props> {
  render() {
    return <Employees />;
  }
}

export default EmployeesContainer;
