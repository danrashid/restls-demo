import * as React from 'react';
import { IEmployee } from '../interfaces/employee';
import { Link } from 'react-router-dom';

const Employee: React.SFC<{ employee: IEmployee }> = ({
  employee: {
    id,
    companyId,
    phone: workPhone,
    emailAddress: workEmailAdress,
    jobTitle,
    comments,
    created: profileCreated,
    updated,
    isArchived,
    user: {
      emailAddress: personalEmailAddress,
      name,
      phone: personalPhone,
      created: accountCreated
    }
  }
}) => (
  <div>
    <h1>{name}</h1>
    {isArchived && (
      <p>
        <em>Archived</em>
      </p>
    )}
    <h3>Work info</h3>
    <dl>
      <dt>Email address</dt>
      <dd>
        <a href={`mailto:${workEmailAdress}`}>{workEmailAdress}</a>
      </dd>
      <dt>Phone</dt>
      <dd>
        <a href={`tel:${workPhone}`}>{workPhone}</a>
      </dd>
      {jobTitle && (
        <React.Fragment>
          <dt>Job title</dt>
          <dd>{jobTitle}</dd>
        </React.Fragment>
      )}
      {comments && (
        <React.Fragment>
          <dt>Comments</dt>
          <dd>{comments}</dd>
        </React.Fragment>
      )}
      <dt>Profile created</dt>
      <dd>{new Date(profileCreated).toLocaleString()}</dd>
      <dt>Profile last updated</dt>
      <dd>{new Date(updated).toLocaleString()}</dd>
    </dl>
    <h3>Personal Info</h3>
    <dl>
      <dt>Email address</dt>
      <dd>
        <a href={`mailto:${personalEmailAddress}`}>{personalEmailAddress}</a>
      </dd>
      <dt>Phone</dt>
      <dd>
        <a href={`tel:${personalPhone}`}>{personalPhone}</a>
      </dd>
      <dt>Account created</dt>
      <dd>{new Date(accountCreated).toLocaleString()}</dd>
    </dl>
    <p>
      <Link to={`/companies/${companyId}/employees/${id}/edit`}>
        Edit Employee
      </Link>
    </p>
  </div>
);

export default Employee;
