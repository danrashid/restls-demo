import * as React from 'react';
import EmployeeForm from '../components/EmployeeForm';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { Action, addEmployee } from '../actions/addEmployee';
import { connect } from 'react-redux';
import { fetchUserIfNeeded } from '../actions/user';
import { History } from 'history';
import { IEmployee } from '../interfaces/employee';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';

type OwnProps = {
  history: History;
  match: {
    params: {
      companyId: string;
      userId: string;
    };
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const mapStateToProps = (state: RootState) => state.user;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, Action>,
  {
    history,
    match: {
      params: { userId }
    }
  }: OwnProps
) => ({
  addEmployee: (employeeForm: IEmployee) =>
    dispatch(addEmployee(employeeForm, history)),
  fetchUserIfNeeded: () => dispatch(fetchUserIfNeeded(userId))
});

class AddEmployeeContainer extends React.Component<Props> {
  onSubmit = async (employeeForm: IEmployee) =>
    await this.props.addEmployee(employeeForm);

  componentDidMount() {
    this.props.fetchUserIfNeeded();
  }

  render() {
    const {
      user,
      isFetching,
      error,
      match: {
        params: { companyId }
      }
    } = this.props;
    return user && !isFetching ? (
      <EmployeeForm
        onSubmit={this.onSubmit}
        initialValues={{ companyId, userId: user.id }}
        user={user}
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
