import * as React from 'react';

const Header: React.SFC = ({ children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between"
    }}
  >
    {children}
  </div>
);

export default Header;
