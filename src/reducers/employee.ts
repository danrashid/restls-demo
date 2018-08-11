import { Action } from '../actions/employee';
import { AxiosError } from 'axios';
import { IEmployee } from '../interfaces/employee';
export const FETCH_EMPLOYEE_REQUEST = "FETCH_EMPLOYEE_REQUEST";
export const FETCH_EMPLOYEE_SUCCESS = "FETCH_EMPLOYEE_SUCCESS";
export const FETCH_EMPLOYEE_FAILURE = "FETCH_EMPLOYEE_FAILURE";

export type State = {
  readonly isFetching: boolean;
  readonly employee: IEmployee | null;
  readonly error: AxiosError | null;
};

export const initialState: State = {
  isFetching: false,
  employee: null,
  error: null
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case FETCH_EMPLOYEE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_EMPLOYEE_SUCCESS:
      return {
        isFetching: false,
        employee: action.payload,
        error: null
      };
    case FETCH_EMPLOYEE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
