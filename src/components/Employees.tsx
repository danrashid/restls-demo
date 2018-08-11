import * as React from 'react';
import { IEmployee } from '../interfaces/employee';

const Employees: React.SFC<{ employees: IEmployee[] }> = ({ employees }) => (
  <div>
    <pre>{JSON.stringify(employees, undefined, "  ")}</pre>
  </div>
);

export default Employees;
