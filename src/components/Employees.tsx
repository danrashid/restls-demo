import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { IEmployee } from '../interfaces/employee';
import { Link } from 'react-router-dom';

const Employees: React.SFC<{ employees: IEmployee[]; companyId: string }> = ({
  employees,
  companyId
}) => (
  <div>
    <Typography>Employees</Typography>
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
