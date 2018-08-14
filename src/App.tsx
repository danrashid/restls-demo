import * as React from 'react';
import AddCompany from './containers/AddCompany';
import AddEmployeeStep1 from './containers/AddEmployeeStep1';
import AddEmployeeStep2 from './containers/AddEmployeeStep2';
import Companies from './containers/Companies';
import Company from './containers/Company';
import EditCompany from './containers/EditCompany';
import EditEmployee from './containers/EditEmployee';
import Employee from './containers/Employee';
import Employees from './containers/Employees';
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

const App: React.SFC = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route
          path="/companies/:companyId/employees/:employeeId/edit"
          component={EditEmployee}
        />
        <Route
          path="/companies/:companyId/employees/add/:userId"
          component={AddEmployeeStep2}
        />
        <Route
          path="/companies/:companyId/employees/add"
          component={AddEmployeeStep1}
        />
        <Route
          path="/companies/:companyId/employees/:employeeId"
          component={Employee}
        />
        <Route path="/companies/:companyId/employees" component={Employees} />
        <Route path="/companies/:companyId/edit" component={EditCompany} />
        <Route path="/companies/add" component={AddCompany} />
        <Route path="/companies/:companyId" component={Company} />
        <Route path="/companies" component={Companies} />
        <Redirect from="/" to="/companies" />
      </Switch>
    </Router>
  </Provider>
);

export default App;
