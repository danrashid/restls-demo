import { Action } from '../actions/users';
import { AxiosError } from 'axios';
import { IUser } from '../interfaces/user';
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export type State = {
  readonly isFetching: boolean;
  readonly users: IUser[] | null;
  readonly error: AxiosError | null;
};

export const initialState: State = {
  isFetching: false,
  users: null,
  error: null
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        isFetching: false,
        users: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
        error: null
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
