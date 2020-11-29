import React from 'react';
import Main from './Main';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import PatientDashboard from './PatientDashboard';
import TwoColumn from './TwoColumn';
import AddPatientForm from '../components/AddPatientForm';
import AppContainer from '../components/AppContainer';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
        <Switch>
          <PublicRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/patient_add" component={AddPatientForm} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PublicRoute exact path="/patients" component={PatientDashboard}/>
          <PublicRoute exact path="/2c" component={TwoColumn}/>
          <PublicRoute exact={false} path="/" component={Main} />
        </Switch>
    </Router>
  );
};

export default AppRouter;
