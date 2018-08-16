import * as React from 'react';

const ProtocolAnchor: React.SFC<{
  protocol: "mailto" | "tel";
  value: string;
}> = ({ protocol, value }) => <a href={`${protocol}:${value}`}>{value}</a>;

export default ProtocolAnchor;
