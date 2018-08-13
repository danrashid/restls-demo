import * as React from 'react';
import Company from '../components/Company';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { Action, fetchCompanyIfNeeded } from '../actions/fetchCompany';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';

type OwnProps = {
  match: {
    params: {
      companyId: string;
    };
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const mapStateToProps = (state: RootState) => state.company;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, Action>,
  {
    match: {
      params: { companyId }
    }
  }: OwnProps
) => ({
  fetchCompanyIfNeeded: () => dispatch(fetchCompanyIfNeeded(companyId))
});

class CompanyContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCompanyIfNeeded();
  }

  render() {
    const { company, isFetching, error } = this.props;
    return company && !isFetching ? (
      <Company company={company} />
    ) : error ? (
      <Error />
    ) : (
      <Spinner />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyContainer);
