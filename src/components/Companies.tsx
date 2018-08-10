import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { ICompany } from '../interfaces/company';
import { Link } from 'react-router-dom';

const Companies: React.SFC<{ companies: ICompany[] }> = ({ companies }) => (
  <div>
    <Typography>Companies</Typography>
    {companies.map(({ id, name }) => (
      <div key={id}>
        <Link to={`/companies/${id}`}>{name}</Link>
      </div>
    ))}
  </div>
);

export default Companies;
