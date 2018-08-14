import * as React from 'react';
import Employee from '../components/Employee';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { Action, fetchEmployeeIfNeeded } from '../actions/fetchEmployee';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';

type OwnProps = {
  match: {
    params: {
      employeeId: string;
    };
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const mapStateToProps = (state: RootState) => state.employee;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, Action>,
  {
    match: {
      params: { employeeId }
    }
  }: OwnProps
) => ({
  fetchEmployeeIfNeeded: () => dispatch(fetchEmployeeIfNeeded(employeeId))
});

class EmployeeContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchEmployeeIfNeeded();
  }

  render() {
    const { employee, isFetching, error } = this.props;
    return employee && !isFetching ? (
      <Employee employee={employee} />
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
)(EmployeeContainer);
