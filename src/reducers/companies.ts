import { Action } from '../actions/companies';
import { AxiosError } from 'axios';
import { ICompany } from '../interfaces/company';
export const FETCH_COMPANIES_REQUEST = "FETCH_COMPANIES_REQUEST";
export const FETCH_COMPANIES_SUCCESS = "FETCH_COMPANIES_SUCCESS";
export const FETCH_COMPANIES_FAILURE = "FETCH_COMPANIES_FAILURE";

export type State = {
  readonly isFetching: boolean;
  readonly companies: ICompany[] | null;
  readonly error: AxiosError | null;
};

export const initialState: State = {
  isFetching: false,
  companies: null,
  error: null
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case FETCH_COMPANIES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_COMPANIES_SUCCESS:
      return {
        isFetching: false,
        companies: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
        error: null
      };
    case FETCH_COMPANIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
