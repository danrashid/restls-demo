import * as React from 'react';
import Employees from '../components/Employees';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { Action, fetchEmployeesIfNeeded } from '../actions/employees';
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

const mapStateToProps = (state: RootState) => state.employees;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, Action>,
  {
    match: {
      params: { companyId }
    }
  }: OwnProps
) => ({
  fetchEmployeesIfNeeded: () => dispatch(fetchEmployeesIfNeeded(companyId))
});

class EmployeesContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchEmployeesIfNeeded();
  }

  render() {
    const {
      employees,
      isFetching,
      error,
      match: {
        params: { companyId }
      }
    } = this.props;
    return employees && !isFetching ? (
      <Employees employees={employees} companyId={companyId} />
    ) : error ? (
      <Error error={error} />
    ) : (
      <Spinner />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesContainer);
