import * as React from 'react';
import Company from '../components/Company';

type OwnProps = {
  match: {
    params: {
      companyId: string;
    };
  };
};

type Props = OwnProps;

class CompanyContainer extends React.Component<Props> {
  render() {
    return <Company />;
  }
}

export default CompanyContainer;
