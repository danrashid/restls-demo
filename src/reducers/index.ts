import { combineReducers } from 'redux';
import { reducer as companies, State as CompaniesState } from './companies';
import { reducer as company, State as CompanyState } from './company';
import { reducer as employees, State as EmployeesState } from './employees';

export type RootState = {
  companies: CompaniesState;
  company: CompanyState;
  employees: EmployeesState;
};

export default combineReducers<RootState>({
  companies,
  company,
  employees
});
