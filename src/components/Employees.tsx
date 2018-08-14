import * as React from 'react';
import Header from './Header';
import { IEmployee } from '../interfaces/employee';
import { Link } from 'react-router-dom';

const Employees: React.SFC<{ employees: IEmployee[]; companyId: string }> = ({
  employees,
  companyId
}) => (
  <div>
    <Header>
      <h1>Employees</h1>
      <p>
        <Link to={`/companies/${companyId}/employees/add`}>
          Add an Employee
        </Link>
      </p>
    </Header>
    <ul>
      {employees.map(({ id, user: { name } }) => (
        <li key={id}>
          <Link to={`/companies/${companyId}/employees/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Employees;
