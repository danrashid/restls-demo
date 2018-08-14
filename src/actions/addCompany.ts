import * as types from '../reducers/company';
import axios, { AxiosError } from 'axios';
import { History } from 'history';
import { ICompany } from '../interfaces/company';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';

export const addCompanyRequest = () => ({
  type: types.ADD_COMPANY_REQUEST as typeof types.ADD_COMPANY_REQUEST
});

export const addCompanySuccess = (payload: ICompany) => ({
  type: types.ADD_COMPANY_SUCCESS as typeof types.ADD_COMPANY_SUCCESS,
  payload
});

export const addCompanyFailure = (error: AxiosError) => ({
  type: types.ADD_COMPANY_FAILURE as typeof types.ADD_COMPANY_FAILURE,
  error
});

export const addCompany = (
  company: ICompany,
  history: History
): ThunkAction<Promise<ICompany>, RootState, null, Action> => dispatch => {
  return new Promise<ICompany>(async (resolve, reject) => {
    try {
      dispatch(addCompanyRequest());

      const now = Date.now();
      const response = await axios.post<ICompany>(`/api/companies`, {
        ...company,
        created: now,
        updated: now,
        isArchived: false,
        numEmployees: 0
      });
      const newCompany = response.data;

      dispatch(addCompanySuccess(newCompany));

      history.push(`/companies/${newCompany.id}`);

      resolve(newCompany);
    } catch (error) {
      dispatch(addCompanyFailure(error));
      reject(error);
    }
  });
};

export type Action =
  | ReturnType<typeof addCompanyRequest>
  | ReturnType<typeof addCompanySuccess>
  | ReturnType<typeof addCompanyFailure>;
