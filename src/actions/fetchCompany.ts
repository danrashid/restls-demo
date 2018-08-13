import * as types from '../reducers/company';
import axios, { AxiosError } from 'axios';
import { ICompany } from '../interfaces/company';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';

const fetchCompanyRequest = () => ({
  type: types.FETCH_COMPANY_REQUEST as typeof types.FETCH_COMPANY_REQUEST
});

const fetchCompanySuccess = (payload: ICompany) => ({
  type: types.FETCH_COMPANY_SUCCESS as typeof types.FETCH_COMPANY_SUCCESS,
  payload
});

const fetchCompanyFailure = (error: AxiosError) => ({
  type: types.FETCH_COMPANY_FAILURE as typeof types.FETCH_COMPANY_FAILURE,
  error
});

const shouldFetchCompany = ({ company: { isFetching } }: RootState) =>
  !isFetching;

const fetchCompany = (
  id: string
): ThunkAction<void, RootState, null, Action> => async dispatch => {
  try {
    dispatch(fetchCompanyRequest());

    const response = await axios.get<ICompany>(`/api/companies/${id}`);

    dispatch(fetchCompanySuccess(response.data));
  } catch (error) {
    dispatch(fetchCompanyFailure(error));
  }
};

export const fetchCompanyIfNeeded = (
  id: string
): ThunkAction<void, RootState, null, Action> => (dispatch, getState) => {
  if (shouldFetchCompany(getState())) {
    dispatch(fetchCompany(id));
  }
};

export type Action =
  | ReturnType<typeof fetchCompanyRequest>
  | ReturnType<typeof fetchCompanySuccess>
  | ReturnType<typeof fetchCompanyFailure>;
