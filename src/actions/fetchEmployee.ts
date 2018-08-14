import * as types from '../reducers/employee';
import axios, { AxiosError } from 'axios';
import { IEmployee } from '../interfaces/employee';
import { IUser } from '../interfaces/user';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';

const fetchEmployeeRequest = () => ({
  type: types.FETCH_EMPLOYEE_REQUEST as typeof types.FETCH_EMPLOYEE_REQUEST
});

const fetchEmployeeSuccess = (payload: IEmployee) => ({
  type: types.FETCH_EMPLOYEE_SUCCESS as typeof types.FETCH_EMPLOYEE_SUCCESS,
  payload
});

const fetchEmployeeFailure = (error: AxiosError) => ({
  type: types.FETCH_EMPLOYEE_FAILURE as typeof types.FETCH_EMPLOYEE_FAILURE,
  error
});

const shouldFetchEmployee = ({ employee: { isFetching } }: RootState) =>
  !isFetching;

const fetchEmployee = (
  id: string
): ThunkAction<void, RootState, null, Action> => async dispatch => {
  try {
    dispatch(fetchEmployeeRequest());

    const employee = await axios.get<IEmployee>(`/api/employees/${id}`);
    const user = await axios.get<IUser>(`/api/users/${employee.data.userId}`);

    dispatch(
      fetchEmployeeSuccess({
        ...employee.data,
        user: user.data
      })
    );
  } catch (error) {
    dispatch(fetchEmployeeFailure(error));
  }
};

export const fetchEmployeeIfNeeded = (
  id: string
): ThunkAction<void, RootState, null, Action> => (dispatch, getState) => {
  if (shouldFetchEmployee(getState())) {
    dispatch(fetchEmployee(id));
  }
};

export type Action =
  | ReturnType<typeof fetchEmployeeRequest>
  | ReturnType<typeof fetchEmployeeSuccess>
  | ReturnType<typeof fetchEmployeeFailure>;
