import * as React from 'react';
import { ICompany } from '../interfaces/company';
import { Link } from 'react-router-dom';

const Companies: React.SFC<{ companies: ICompany[] }> = ({ companies }) => (
  <div>
    <h1>Companies</h1>
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
