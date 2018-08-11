import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { ICompany } from '../interfaces/company';
import { Link } from 'react-router-dom';

const Companies: React.SFC<{ companies: ICompany[] }> = ({ companies }) => (
  <div>
    <Typography>Companies</Typography>
    <ul>
      <li>
        <Link to="/companies/add">Add a Company</Link>
      </li>
    </ul>
    <ul>
      {companies.map(({ id, name }) => (
        <li key={id}>
          <Link to={`/companies/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Companies;
