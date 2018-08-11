import * as types from '../reducers/employees';
import axios, { AxiosError } from 'axios';
import { IEmployee, IEmployeePayload } from '../interfaces/employee';
import { IUser } from '../interfaces/user';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';

const fetchEmployeesRequest = () => ({
  type: types.FETCH_EMPLOYEES_REQUEST as typeof types.FETCH_EMPLOYEES_REQUEST
});

const fetchEmployeesSuccess = (payload: IEmployee[]) => ({
  type: types.FETCH_EMPLOYEES_SUCCESS as typeof types.FETCH_EMPLOYEES_SUCCESS,
  payload
});

const fetchEmployeesFailure = (error: AxiosError) => ({
  type: types.FETCH_EMPLOYEES_FAILURE as typeof types.FETCH_EMPLOYEES_FAILURE,
  error
});

const shouldFetchEmployees = ({ employees: { isFetching } }: RootState) =>
  !isFetching;

const fetchEmployees = (
  companyId: string
): ThunkAction<void, RootState, null, Action> => async dispatch => {
  try {
    dispatch(fetchEmployeesRequest());

    const employees = await axios.get<IEmployeePayload[]>(
      `/api/employees?companyId=${companyId}&isArchived=false`
    );
    const users = await axios.all(
      employees.data.map(({ userId }) =>
        axios.get<IUser>(`/api/users/${userId}`)
      )
    );

    dispatch(
      fetchEmployeesSuccess(
        employees.data.map((e, i) => ({
          ...e,
          user: users[i].data
        }))
      )
    );
  } catch (error) {
    dispatch(fetchEmployeesFailure(error));
  }
};

export const fetchEmployeesIfNeeded = (
  companyId: string
): ThunkAction<void, RootState, null, Action> => (dispatch, getState) => {
  if (shouldFetchEmployees(getState())) {
    dispatch(fetchEmployees(companyId));
  }
};

export type Action =
  | ReturnType<typeof fetchEmployeesRequest>
  | ReturnType<typeof fetchEmployeesSuccess>
  | ReturnType<typeof fetchEmployeesFailure>;
