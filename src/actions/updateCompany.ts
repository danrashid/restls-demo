import * as types from '../reducers/company';
import axios, { AxiosError } from 'axios';
import { History } from 'history';
import { ICompany } from '../interfaces/company';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';

export const updateCompanyRequest = () => ({
  type: types.UPDATE_COMPANY_REQUEST as typeof types.UPDATE_COMPANY_REQUEST
});

export const updateCompanySuccess = (payload: ICompany) => ({
  type: types.UPDATE_COMPANY_SUCCESS as typeof types.UPDATE_COMPANY_SUCCESS,
  payload
});

export const updateCompanyFailure = (error: AxiosError) => ({
  type: types.UPDATE_COMPANY_FAILURE as typeof types.UPDATE_COMPANY_FAILURE,
  error
});

export const updateCompany = (
  company: ICompany,
  history: History
): ThunkAction<Promise<ICompany>, RootState, null, Action> => dispatch => {
  return new Promise<ICompany>(async (resolve, reject) => {
    try {
      dispatch(updateCompanyRequest());

      const response = await axios.put<ICompany>(
        `/api/companies/${company.id}`,
        company
      );

      dispatch(updateCompanySuccess(response.data));

      history.push(`/companies/${company.id}`);

      resolve(response.data);
    } catch (error) {
      dispatch(updateCompanyFailure(error));
      reject(error);
    }
  });
};

export type Action =
  | ReturnType<typeof updateCompanyRequest>
  | ReturnType<typeof updateCompanySuccess>
  | ReturnType<typeof updateCompanyFailure>;
