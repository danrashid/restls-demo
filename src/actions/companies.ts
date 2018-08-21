import * as types from '../reducers/companies';
import axios, { AxiosError } from 'axios';
import { companies } from '../interfaces/collections';
import { GET } from 'restls';
import { ICompany } from '../interfaces/company';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';

const fetchCompaniesRequest = () => ({
  type: types.FETCH_COMPANIES_REQUEST as typeof types.FETCH_COMPANIES_REQUEST
});

const fetchCompaniesSuccess = (payload: ICompany[]) => ({
  type: types.FETCH_COMPANIES_SUCCESS as typeof types.FETCH_COMPANIES_SUCCESS,
  payload
});

const fetchCompaniesFailure = (error: AxiosError) => ({
  type: types.FETCH_COMPANIES_FAILURE as typeof types.FETCH_COMPANIES_FAILURE,
  error
});

const shouldFetchCompanies = ({ companies: { isFetching } }: RootState) =>
  !isFetching;

const fetchCompanies = (): ThunkAction<
  void,
  RootState,
  null,
  Action
> => async dispatch => {
  try {
    dispatch(fetchCompaniesRequest());

    const response =
      process.env.REACT_APP_MODE === "demo"
        ? await GET<ICompany[]>(
            companies,
            (c: ICompany) => !c.isArchived,
            true,
            750
          )
        : await axios.get<ICompany[]>("/api/companies?isArchived=false");

    dispatch(fetchCompaniesSuccess(response.data));
  } catch (error) {
    dispatch(fetchCompaniesFailure(error));
  }
};

export const fetchCompaniesIfNeeded = (): ThunkAction<
  void,
  RootState,
  null,
  Action
> => (dispatch, getState) => {
  if (shouldFetchCompanies(getState())) {
    dispatch(fetchCompanies());
  }
};

export type Action =
  | ReturnType<typeof fetchCompaniesRequest>
  | ReturnType<typeof fetchCompaniesSuccess>
  | ReturnType<typeof fetchCompaniesFailure>;
