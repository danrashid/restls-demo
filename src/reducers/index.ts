import { combineReducers } from 'redux';
import { reducer as companies, State as CompaniesState } from './companies';
import { reducer as company, State as CompanyState } from './company';
import { reducer as employees, State as EmployeesState } from './employees';
import { reducer as employee, State as EmployeeState } from './employee';

export type RootState = {
  companies: CompaniesState;
  company: CompanyState;
  employees: EmployeesState;
  employee: EmployeeState;
};

export default combineReducers<RootState>({
  companies,
  company,
  employees,
  employee
});
