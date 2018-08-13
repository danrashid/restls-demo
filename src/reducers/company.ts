import { Action as FetchAction } from '../actions/fetchCompany';
import { Action as UpdateAction } from '../actions/updateCompany';
import { AxiosError } from 'axios';
import { ICompany } from '../interfaces/company';
export const FETCH_COMPANY_REQUEST = "FETCH_COMPANY_REQUEST";
export const FETCH_COMPANY_SUCCESS = "FETCH_COMPANY_SUCCESS";
export const FETCH_COMPANY_FAILURE = "FETCH_COMPANY_FAILURE";
export const UPDATE_COMPANY_REQUEST = "UPDATE_COMPANY_REQUEST";
export const UPDATE_COMPANY_SUCCESS = "UPDATE_COMPANY_SUCCESS";
export const UPDATE_COMPANY_FAILURE = "UPDATE_COMPANY_FAILURE";

export type State = {
  readonly isFetching: boolean;
  readonly company: ICompany | null;
  readonly error: AxiosError | null;
};

export const initialState: State = {
  isFetching: false,
  company: null,
  error: null
};

export function reducer(
  state: State = initialState,
  action: FetchAction | UpdateAction
): State {
  switch (action.type) {
    case FETCH_COMPANY_REQUEST:
    case UPDATE_COMPANY_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_COMPANY_SUCCESS:
    case UPDATE_COMPANY_SUCCESS:
      return {
        isFetching: false,
        company: action.payload,
        error: null
      };
    case FETCH_COMPANY_FAILURE:
    case UPDATE_COMPANY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
