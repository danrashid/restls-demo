import { Action as FetchAction } from '../actions/fetchEmployee';
import { Action as UpdateAction } from '../actions/updateEmployee';
import { Action as AddAction } from '../actions/addEmployee';
import { AxiosError } from 'axios';
import { IEmployee, IEmployeePayload } from '../interfaces/employee';
export const ADD_EMPLOYEE_REQUEST = "ADD_EMPLOYEE_REQUEST";
export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
export const ADD_EMPLOYEE_FAILURE = "ADD_EMPLOYEE_FAILURE";
export const FETCH_EMPLOYEE_REQUEST = "FETCH_EMPLOYEE_REQUEST";
export const FETCH_EMPLOYEE_SUCCESS = "FETCH_EMPLOYEE_SUCCESS";
export const FETCH_EMPLOYEE_FAILURE = "FETCH_EMPLOYEE_FAILURE";
export const UPDATE_EMPLOYEE_REQUEST = "UPDATE_EMPLOYEE_REQUEST";
export const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_EMPLOYEE_SUCCESS";
export const UPDATE_EMPLOYEE_FAILURE = "UPDATE_EMPLOYEE_FAILURE";

export type State = {
  readonly isFetching: boolean;
  readonly employee: IEmployee | null;
  readonly employeePayload: IEmployeePayload | null;
  readonly error: AxiosError | null;
};

export const initialState: State = {
  isFetching: false,
  employee: null,
  employeePayload: null,
  error: null
};

export function reducer(
  state: State = initialState,
  action: FetchAction | UpdateAction | AddAction
): State {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
    case FETCH_EMPLOYEE_REQUEST:
    case UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employee: action.payload,
        error: null
      };
    case ADD_EMPLOYEE_SUCCESS:
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employeePayload: action.payload,
        error: null
      };
    case ADD_EMPLOYEE_FAILURE:
    case FETCH_EMPLOYEE_FAILURE:
    case UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
