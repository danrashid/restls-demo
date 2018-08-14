import * as React from 'react';
import EmployeeForm from '../components/EmployeeForm';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { Action, addEmployee } from '../actions/addEmployee';
import { connect } from 'react-redux';
import { fetchUsersIfNeeded } from '../actions/users';
import { History } from 'history';
import { IEmployee } from '../interfaces/employee';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';

type OwnProps = {
  history: History;
  match: {
    params: {
      companyId: string;
    };
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const mapStateToProps = (state: RootState) => state.users;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, Action>,
  { history }: OwnProps
) => ({
  addEmployee: (employeeForm: IEmployee) =>
    dispatch(addEmployee(employeeForm, history)),
  fetchUsersIfNeeded: () => dispatch(fetchUsersIfNeeded())
});

class AddEmployeeContainer extends React.Component<Props> {
  onSubmit = async (employeeForm: IEmployee) =>
    await this.props.addEmployee(employeeForm);

  componentDidMount() {
    this.props.fetchUsersIfNeeded();
  }

  render() {
    const {
      users,
      isFetching,
      error,
      match: {
        params: { companyId }
      }
    } = this.props;
    return users && !isFetching ? (
      <EmployeeForm
        onSubmit={this.onSubmit}
        initialValues={{ companyId }}
        users={users}
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
)(AddEmployeeContainer);
