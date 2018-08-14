import * as React from 'react';
import Header from './Header';
import { ICompany } from '../interfaces/company';
import { Link } from 'react-router-dom';

const Companies: React.SFC<{ companies: ICompany[] }> = ({ companies }) => (
  <div>
    <Header>
      <h1>Companies</h1>
      <p>
        <Link to="/companies/add">Add a Company</Link>
      </p>
    </Header>
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
