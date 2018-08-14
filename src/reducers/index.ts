import { combineReducers } from 'redux';
import { FormStateMap, reducer as form } from 'redux-form';
import { reducer as companies, State as CompaniesState } from './companies';
import { reducer as company, State as CompanyState } from './company';
import { reducer as employees, State as EmployeesState } from './employees';
import { reducer as employee, State as EmployeeState } from './employee';
import { reducer as users, State as UsersState } from './users';

export type RootState = {
  form: FormStateMap;
  companies: CompaniesState;
  company: CompanyState;
  employees: EmployeesState;
  employee: EmployeeState;
  users: UsersState;
};

export default combineReducers<RootState>({
  form,
  companies,
  company,
  employees,
  employee,
  users
});
