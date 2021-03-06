import * as types from '../reducers/users';
import axios, { AxiosError } from 'axios';
import { GET } from 'restls';
import { IUser } from '../interfaces/user';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';
import { users } from '../interfaces/collections';

const fetchUsersRequest = () => ({
  type: types.FETCH_USERS_REQUEST as typeof types.FETCH_USERS_REQUEST
});

const fetchUsersSuccess = (payload: IUser[]) => ({
  type: types.FETCH_USERS_SUCCESS as typeof types.FETCH_USERS_SUCCESS,
  payload
});

const fetchUsersFailure = (error: AxiosError) => ({
  type: types.FETCH_USERS_FAILURE as typeof types.FETCH_USERS_FAILURE,
  error
});

const shouldfetchUsers = ({ users: { isFetching } }: RootState) => !isFetching;

const fetchUsers = (): ThunkAction<
  void,
  RootState,
  null,
  Action
> => async dispatch => {
  try {
    dispatch(fetchUsersRequest());

    const response =
      process.env.REACT_APP_MODE === "demo"
        ? await GET<IUser[]>(users, (u: IUser) => !u.isArchived, true, 750)
        : await axios.get<IUser[]>("/api/users?isArchived=false");

    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error));
  }
};

export const fetchUsersIfNeeded = (): ThunkAction<
  void,
  RootState,
  null,
  Action
> => (dispatch, getState) => {
  if (shouldfetchUsers(getState())) {
    dispatch(fetchUsers());
  }
};

export type Action =
  | ReturnType<typeof fetchUsersRequest>
  | ReturnType<typeof fetchUsersSuccess>
  | ReturnType<typeof fetchUsersFailure>;
