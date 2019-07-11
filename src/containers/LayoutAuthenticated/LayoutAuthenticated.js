import React from 'react';
import { useSelector } from 'react-redux';
import * as globalconstants from '../../global-constants';
import ReceptionDashboard from '../ReceptionDashboard/ReceptionDashboard';
import CounterClinicAppBar from '../../components/AppBar';
import { Paper, Box } from '@material-ui/core';
import DoctorDashboard from '../DoctorDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import LayoutUnauthenticated from '../LayoutUnauthenticated/LayoutUnauthenticated';
import { withRouter, Redirect } from 'react-router-dom'; 

function LayoutAuthenticated(props) {

    const loggedInUser = useSelector(state => state.loggedInUser);

    if (!loggedInUser || !loggedInUser.roles) {
        return <Redirect to={"/login"} />
        // return <LayoutUnauthenticated />
    }

    if (loggedInUser.roles.includes(globalconstants.DOCTOR)) {
        return (
            
            <Box>
                <CounterClinicAppBar 
                    history={props.history}
                    navLinks={[
                        {link: "/dashboard", text: "Dashboard"},
                        {link: "/dashboard/calendar", text: "Appointment Calendar"}
                    ]} 
                    title={"Doctor Dashboard: Welcome, " + loggedInUser.fullName} />
                <DoctorDashboard path={props.match} />
            </Box>
            
        );
    }

    if (loggedInUser.roles.includes(globalconstants.RECEPTIONIST)) {
        return (
            <Box>
                <CounterClinicAppBar 
                    history={props.history}
                    title={"Reception Dashboard: Welcome, " + loggedInUser.fullName}
                    navLinks={[
                        {link: "/dashboard", text: "Dashboard"},
                        {link: "/dashboard/calendar", text: "Appointment Calendar"}
                        ]} />
                <ReceptionDashboard path={props.match}/>
            </Box>
        );
    }

    if (loggedInUser.roles.includes(globalconstants.ADMIN)) {
        console.log(props.match);
        return (
            <Box>
                <AdminDashboard {...props} path={props.match} loggedInUser={loggedInUser} />
            </Box>
        );
    }

    return (
        <Paper>You are not authorized to make this request.</Paper>
    );
}

export default withRouter(LayoutAuthenticated);