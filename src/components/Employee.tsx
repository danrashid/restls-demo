import * as React from 'react';
import { IEmployee } from '../interfaces/employee';

const Employee: React.SFC<{ employee: IEmployee }> = ({ employee }) => (
  <div>
    <pre>{JSON.stringify(employee, undefined, "  ")}</pre>
  </div>
);

export default Employee;
