import * as React from 'react';
import { ICompany } from '../interfaces/company';
import { Link } from 'react-router-dom';

const Company: React.SFC<{ company: ICompany }> = ({ company }) => (
  <div>
    <pre>{JSON.stringify(company, undefined, "  ")}</pre>
    <p>
      <Link to={`/companies/${company.id}/employees`}>Employees</Link>
    </p>
  </div>
);

export default Company;
