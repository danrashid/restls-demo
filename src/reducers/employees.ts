import { Action } from '../actions/employees';
import { AxiosError } from 'axios';
import { IEmployee } from '../interfaces/employee';
export const FETCH_EMPLOYEES_REQUEST = "FETCH_EMPLOYEES_REQUEST";
export const FETCH_EMPLOYEES_SUCCESS = "FETCH_EMPLOYEES_SUCCESS";
export const FETCH_EMPLOYEES_FAILURE = "FETCH_EMPLOYEES_FAILURE";

export type State = {
  readonly isFetching: boolean;
  readonly employees: IEmployee[] | null;
  readonly error: AxiosError | null;
};

export const initialState: State = {
  isFetching: false,
  employees: null,
  error: null
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        isFetching: false,
        employees: action.payload,
        error: null
      };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
