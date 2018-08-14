import * as types from '../reducers/employee';
import axios, { AxiosError } from 'axios';
import { companies, employees } from '../interfaces/collections';
import { GET, PUT } from 'restls';
import { History } from 'history';
import { ICompany } from '../interfaces/company';
import { IEmployeePayload } from '../interfaces/employee';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';
import { updateCompanySuccess } from '../actions/updateCompany';

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
  Action | ReturnType<typeof updateCompanySuccess>
> => dispatch => {
  return new Promise<IEmployeePayload>(async (resolve, reject) => {
    try {
      dispatch(updateEmployeeRequest());

      const { id: employeeId, companyId } = employee;
      const payload = {
        ...employee,
        updated: Date.now()
      };

      if (process.env.REACT_APP_MODE === "demo") {
        const oldEmployee = await GET<IEmployeePayload>(employees, employeeId);
        if (oldEmployee.data.isArchived !== employee.isArchived) {
          const company = await GET<ICompany>(companies, companyId);
          if (employee.isArchived) {
            --company.data.numEmployees;
          } else {
            ++company.data.numEmployees;
          }
          await PUT<ICompany>(companies, company.data);
          dispatch(updateCompanySuccess(company.data));
        }
      }

      const response =
        process.env.REACT_APP_MODE === "demo"
          ? await PUT<IEmployeePayload>(employees, payload, true, 750)
          : await axios.put<IEmployeePayload>(
              `/api/employees/${employee.id}`,
              payload
            );

      dispatch(updateEmployeeSuccess(response.data));

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
