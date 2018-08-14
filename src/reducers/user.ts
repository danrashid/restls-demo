import { Action } from '../actions/user';
import { AxiosError } from 'axios';
import { IUser } from '../interfaces/user';
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export type State = {
  readonly isFetching: boolean;
  readonly user: IUser | null;
  readonly error: AxiosError | null;
};

export const initialState: State = {
  isFetching: false,
  user: null,
  error: null
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_USER_SUCCESS:
      return {
        isFetching: false,
        user: action.payload,
        error: null
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
