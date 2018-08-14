import * as React from 'react';
import EmployeeForm from '../components/EmployeeForm';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { Action, updateEmployee } from '../actions/updateEmployee';
import { connect } from 'react-redux';
import { fetchEmployeeIfNeeded } from '../actions/fetchEmployee';
import { History } from 'history';
import { IEmployee } from '../interfaces/employee';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';

type OwnProps = {
  history: History;
  match: {
    params: {
      companyId: string;
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
    history,
    match: {
      params: { employeeId }
    }
  }: OwnProps
) => ({
  fetchEmployeeIfNeeded: () => dispatch(fetchEmployeeIfNeeded(employeeId)),
  updateEmployee: (employeeForm: IEmployee) =>
    dispatch(updateEmployee(employeeForm, history))
});

class EditEmployeeContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchEmployeeIfNeeded();
  }

  onSubmit = async (employeeForm: IEmployee) =>
    await this.props.updateEmployee(employeeForm);

  render() {
    const { employee, isFetching, error } = this.props;
    return employee && !isFetching ? (
      <EmployeeForm
        initialValues={employee}
        onSubmit={this.onSubmit}
        user={employee.user}
      />
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
)(EditEmployeeContainer);
