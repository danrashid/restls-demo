import * as React from 'react';
import CompanyForm from '../components/CompanyForm';
import { Action, addCompany } from '../actions/addCompany';
import { connect } from 'react-redux';
import { History } from 'history';
import { ICompany } from '../interfaces/company';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';

type OwnProps = {
  history: History;
};

type Props = ReturnType<typeof mapDispatchToProps> & OwnProps;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, Action>,
  { history }: OwnProps
) => ({
  addCompany: (companyForm: ICompany) =>
    dispatch(addCompany(companyForm, history))
});

class EditCompanyContainer extends React.Component<Props> {
  onSubmit = async (companyForm: ICompany) =>
    await this.props.addCompany(companyForm);

  render() {
    return <CompanyForm onSubmit={this.onSubmit} />;
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(EditCompanyContainer);
