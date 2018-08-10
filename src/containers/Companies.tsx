import * as React from 'react';
import Companies from '../components/Companies';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { Action, fetchCompaniesIfNeeded } from '../actions/companies';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => state.companies;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, Action>
) => ({
  fetchCompaniesIfNeeded: () => dispatch(fetchCompaniesIfNeeded())
});

class CompaniesContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCompaniesIfNeeded();
  }

  render() {
    const { companies, isFetching, error } = this.props;
    return companies && !isFetching ? (
      <Companies companies={companies} />
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
)(CompaniesContainer);
