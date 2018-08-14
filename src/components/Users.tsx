import * as React from 'react';
import { IUser } from '../interfaces/user';
import { Link } from 'react-router-dom';

const Users: React.SFC<{ users: IUser[]; companyId: string }> = ({
  users,
  companyId
}) => (
  <div>
    <h1>Select a User</h1>
    <ul>
      {users.map(({ id, name }) => (
        <li key={id}>
          <Link to={`/companies/${companyId}/employees/add/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Users;
