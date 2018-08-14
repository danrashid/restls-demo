import * as React from 'react';
import { AxiosError } from 'axios';

const Error: React.SFC<{ error: AxiosError | Error }> = ({ error }) => (
  <div>
    <h1>Error</h1>
    <pre>{JSON.stringify(error, undefined, "  ")}</pre>
  </div>
);

export default Error;
