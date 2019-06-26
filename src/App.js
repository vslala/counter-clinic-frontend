import React, { useState } from 'react';
import './App.css';
import CreateAppointment from './components/CreateAppointment'
import CounterClinicAppBar from './components/AppBar/CounterClinicAppBar';
import Grid from '@material-ui/core/Grid';
import NavigationDrawer from './components/NavigationDrawer';
import { Route, BrowserRouter } from 'react-router-dom';
import ViewAppointmentList from './components/ViewAppointmentList';
import ReceptionDashboard from './containers/ReceptionDashboard/ReceptionDashboard';
import store from './store';
import { Provider } from 'react-redux';
import LayoutAuthenticated from './containers/LayoutAuthenticated';
import PrintAppointmentInfo from './containers/PrintAppointmentInfo';

function App() {

  const routing = (
    <BrowserRouter>
    <div className="App">
      <div style={{ marginTop: 20, padding: 30}}>
        <Grid container>
          <Grid item xs={12}>
            
              <div>
                  <Route exact path="/print/appointment-details/:appointmentId" component={PrintAppointmentInfo}></Route>
                  <Route exact path="/dashboard" component={LayoutAuthenticated}></Route>
                  <Route exact path="/create-appointment" component={CreateAppointment}></Route>
                  <Route exact path="/view-all-appointments" component={ViewAppointmentList}></Route>
              </div>
            
          </Grid>
        </Grid>
      </div>
      
    </div>
    </BrowserRouter>
    
  );

  return (
    <Provider store={store}>
      {routing}
    </Provider>
  );
}

export default App;
