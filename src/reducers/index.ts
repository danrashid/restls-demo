import { combineReducers } from 'redux';
import { reducer as companies, State as CompaniesState } from './companies';
import { reducer as company, State as CompanyState } from './company';

export type RootState = {
  companies: CompaniesState;
  company: CompanyState;
};

export default combineReducers<RootState>({
  companies,
  company
});
