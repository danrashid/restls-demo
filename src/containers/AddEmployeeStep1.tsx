import * as React from 'react';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import Users from '../components/Users';
import { Action, fetchUsersIfNeeded } from '../actions/users';
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

const mapStateToProps = (state: RootState) => state.users;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, Action>
) => ({
  fetchUsersIfNeeded: () => dispatch(fetchUsersIfNeeded())
});

class AddEmployeeContainer extends React.Component<Props> {
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
      <Users companyId={companyId} users={users} />
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
