import * as React from 'react';
import CompanyForm from '../components/CompanyForm';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { Action, updateCompany } from '../actions/updateCompany';
import { connect } from 'react-redux';
import { fetchCompanyIfNeeded } from '../actions/fetchCompany';
import { History } from 'history';
import { ICompany } from '../interfaces/company';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';

type OwnProps = {
  history: History;
  match: {
    params: {
      companyId: string;
    };
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const mapStateToProps = (state: RootState) => state.company;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, Action>,
  {
    history,
    match: {
      params: { companyId }
    }
  }: OwnProps
) => ({
  fetchCompanyIfNeeded: () => dispatch(fetchCompanyIfNeeded(companyId)),
  updateCompany: (companyForm: ICompany) =>
    dispatch(updateCompany(companyForm, history))
});

class EditCompanyContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCompanyIfNeeded();
  }

  onSubmit = async (companyForm: ICompany) =>
    await this.props.updateCompany(companyForm);

  render() {
    const { company, isFetching, error } = this.props;
    return company && !isFetching ? (
      <CompanyForm initialValues={company} onSubmit={this.onSubmit} />
    ) : error ? (
      <Error error={error} />
    ) : (
      <Spinner />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCompanyContainer);
