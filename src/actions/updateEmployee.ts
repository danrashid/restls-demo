import * as types from '../reducers/employee';
import axios, { AxiosError } from 'axios';
import { History } from 'history';
import { IEmployeePayload } from '../interfaces/employee';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';

export const updateEmployeeRequest = () => ({
  type: types.UPDATE_EMPLOYEE_REQUEST as typeof types.UPDATE_EMPLOYEE_REQUEST
});

export const updateEmployeeSuccess = (payload: IEmployeePayload) => ({
  type: types.UPDATE_EMPLOYEE_SUCCESS as typeof types.UPDATE_EMPLOYEE_SUCCESS,
  payload
});

export const updateEmployeeFailure = (error: AxiosError) => ({
  type: types.UPDATE_EMPLOYEE_FAILURE as typeof types.UPDATE_EMPLOYEE_FAILURE,
  error
});

export const updateEmployee = (
  employee: IEmployeePayload,
  history: History
): ThunkAction<
  Promise<IEmployeePayload>,
  RootState,
  null,
  Action
> => dispatch => {
  return new Promise<IEmployeePayload>(async (resolve, reject) => {
    try {
      dispatch(updateEmployeeRequest());

      const response = await axios.put<IEmployeePayload>(
        `/api/employees/${employee.id}`,
        {
          ...employee,
          updated: Date.now()
        }
      );

      dispatch(updateEmployeeSuccess(response.data));

      const { id: employeeId, companyId } = response.data;
      history.push(`/companies/${companyId}/employees/${employeeId}`);

      resolve(response.data);
    } catch (error) {
      dispatch(updateEmployeeFailure(error));
      reject(error);
    }
  });
};

export type Action =
  | ReturnType<typeof updateEmployeeRequest>
  | ReturnType<typeof updateEmployeeSuccess>
  | ReturnType<typeof updateEmployeeFailure>;