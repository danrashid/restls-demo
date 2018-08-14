import * as React from 'react';
import { AxiosError } from 'axios';

const Error: React.SFC<{ error: AxiosError | Error }> = ({ error }) => (
  <div>
    <p>Error</p>
    <pre>{JSON.stringify(error, undefined, "  ")}</pre>
  </div>
);

export default Error;
