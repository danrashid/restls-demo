import * as types from '../reducers/user';
import axios, { AxiosError } from 'axios';
import { GET } from 'restls';
import { IUser } from '../interfaces/user';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';
import { users } from '../interfaces/collections';

const fetchUserRequest = () => ({
  type: types.FETCH_USER_REQUEST as typeof types.FETCH_USER_REQUEST
});

const fetchUserSuccess = (payload: IUser) => ({
  type: types.FETCH_USER_SUCCESS as typeof types.FETCH_USER_SUCCESS,
  payload
});

const fetchUserFailure = (error: AxiosError) => ({
  type: types.FETCH_USER_FAILURE as typeof types.FETCH_USER_FAILURE,
  error
});

const shouldfetchUser = ({ user: { isFetching } }: RootState) => !isFetching;

const fetchUser = (
  userId: string
): ThunkAction<void, RootState, null, Action> => async dispatch => {
  try {
    dispatch(fetchUserRequest());

    const response =
      process.env.REACT_APP_MODE === "demo"
        ? await GET<IUser>(users, userId, true, 750)
        : await axios.get<IUser>(`/api/users/${userId}`);

    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure(error));
  }
};

export const fetchUserIfNeeded = (
  userId: string
): ThunkAction<void, RootState, null, Action> => (dispatch, getState) => {
  if (shouldfetchUser(getState())) {
    dispatch(fetchUser(userId));
  }
};

export type Action =
  | ReturnType<typeof fetchUserRequest>
  | ReturnType<typeof fetchUserSuccess>
  | ReturnType<typeof fetchUserFailure>;
