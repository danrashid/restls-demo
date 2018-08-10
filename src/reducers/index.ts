import { combineReducers } from 'redux';
import { reducer as companies, State as CompaniesState } from './companies';

export type RootState = {
  companies: CompaniesState;
};

export default combineReducers<RootState>({
  companies
});
