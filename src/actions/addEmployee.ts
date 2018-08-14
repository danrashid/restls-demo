import * as types from '../reducers/employee';
import axios, { AxiosError } from 'axios';
import { employees } from '../interfaces/collections';
import { History } from 'history';
import { IEmployeePayload } from '../interfaces/employee';
import { POST } from 'restls';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';

export const addEmployeeRequest = () => ({
  type: types.ADD_EMPLOYEE_REQUEST as typeof types.ADD_EMPLOYEE_REQUEST
});

export const addEmployeeSuccess = (payload: IEmployeePayload) => ({
  type: types.ADD_EMPLOYEE_SUCCESS as typeof types.ADD_EMPLOYEE_SUCCESS,
  payload
});

export const addEmployeeFailure = (error: AxiosError) => ({
  type: types.ADD_EMPLOYEE_FAILURE as typeof types.ADD_EMPLOYEE_FAILURE,
  error
});

export const addEmployee = (
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
      dispatch(addEmployeeRequest());

      const now = Date.now();
      const payload = {
        ...employee,
        created: now,
        updated: now,
        isArchived: false
      };

      const response =
        process.env.REACT_APP_MODE === "demo"
          ? await POST<IEmployeePayload>(employees, payload, true, 750)
          : await axios.post<IEmployeePayload>(`/api/employees`, payload);
      const newEmployee = response.data;

      dispatch(addEmployeeSuccess(newEmployee));

      const { id: employeeId, companyId } = newEmployee;
      history.push(`/companies/${companyId}/employees/${employeeId}`);

      resolve(newEmployee);
    } catch (error) {
      dispatch(addEmployeeFailure(error));
      reject(error);
    }
  });
};

export type Action =
  | ReturnType<typeof addEmployeeRequest>
  | ReturnType<typeof addEmployeeSuccess>
  | ReturnType<typeof addEmployeeFailure>;
