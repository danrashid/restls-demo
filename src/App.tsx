import * as React from 'react';
import AddCompany from './containers/AddCompany';
import AddEmployee from './containers/AddEmployee';
import Companies from './containers/Companies';
import Company from './containers/Company';
import EditCompany from './containers/EditCompany';
import EditEmployee from './containers/EditEmployee';
import Employee from './containers/Employee';
import Employees from './containers/Employees';
import Grid from '@material-ui/core/Grid';
import Nav from './components/Nav';
import seedData from './seedData';
import store from './store';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
  } from 'react-router-dom';
import { Provider } from 'react-redux';

if (process.env.REACT_APP_MODE === "demo") {
  seedData();
}

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Nav />
            <Grid container>
              <Grid item xs={12}>
                <Switch>
                  <Route
                    path="/companies/:companyId/employees/:employeeId/edit"
                    component={EditEmployee}
                  />
                  <Route
                    path="/companies/:companyId/employees/add"
                    component={AddEmployee}
                  />
                  <Route
                    path="/companies/:companyId/employees/:employeeId"
                    component={Employee}
                  />
                  <Route
                    path="/companies/:companyId/employees"
                    component={Employees}
                  />
                  <Route
                    path="/companies/:companyId/edit"
                    component={EditCompany}
                  />
                  <Route path="/companies/add" component={AddCompany} />
                  <Route path="/companies/:companyId" component={Company} />
                  <Route path="/companies" component={Companies} />
                  <Redirect from="/" to="/companies" />
                </Switch>
              </Grid>
            </Grid>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
