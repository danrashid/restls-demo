import * as React from 'react';
import { ICompany } from '../interfaces/company';

const Company: React.SFC<{ company: ICompany }> = ({ company }) => (
  <pre>{JSON.stringify(company, undefined, "  ")}</pre>
);

export default Company;
