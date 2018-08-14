import * as React from 'react';
import { ICompany } from '../interfaces/company';
import { Link } from 'react-router-dom';

const Company: React.SFC<{ company: ICompany }> = ({
  company: {
    id,
    name,
    address,
    phone,
    created,
    updated,
    isArchived,
    numEmployees
  }
}) => (
  <div>
    <h1>{name}</h1>
    {isArchived && (
      <p>
        <em>Archived</em>
      </p>
    )}
    <h3>
      <Link to={`/companies/${id}/employees`}>
        {numEmployees.toLocaleString()}{" "}
        {numEmployees === 1 ? "Employee" : "Employees"}
      </Link>
    </h3>
    <dl>
      <dt>Address</dt>
      <dd>
        {address.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </dd>
      <dt>Phone</dt>
      <dd>
        <a href="tel:{phone}">{phone}</a>
      </dd>
      <dt>Created</dt>
      <dd>{new Date(created).toLocaleString()}</dd>
      <dt>Last updated</dt>
      <dd>{new Date(updated).toLocaleString()}</dd>
    </dl>
    <p>
      <Link to={`/companies/${id}/edit`}>Edit Company</Link>
    </p>
  </div>
);

export default Company;
