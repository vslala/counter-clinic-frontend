import React, {useEffect, useState} from "react";
import {CircularProgress, Grid, List, ListItem, Paper, Typography} from "@material-ui/core";
import * as globalconstants from '../../global-constants';
import uuidv4 from 'uuid/v4';

export default function AppointmentDetail(props) {

    const [appointmentWrapper, setAppointmentWrapper] = useState({})

    const fetchAppointment = (appointmentId) => {
        fetch(globalconstants.BASE_URL + '/walk-in-appointment/wrapped/id/' + appointmentId, {
            method: 'GET',
            headers: {
                'Authorization': globalconstants.accessToken(),
            }
        })
        .then( (response) => response.json() )
        .then( (data) => {
            console.log("Appointment Info");
            console.log(data);
            setAppointmentWrapper(data);
        });
    }

    useEffect(() => {
        setTimeout(fetchAppointment(props.appointmentId), 3000);
    }, []);

    if (! appointmentWrapper.qrCode) {
        console.log("QRCode: ", appointmentWrapper);
        return (
            <Paper>
                <CircularProgress/>
            </Paper>
        );
    }
    return (
        <Paper style={{textAlign: "center"}}>
            <List style={{minWidth: 400}}>
                {
                    [
                        <div>
                            <img alt={appointmentWrapper.qrCode.qrCodeName}
                                 src={globalconstants.BASE_URL + '/' + appointmentWrapper.qrCode.qrCodeUrlPath} />
                        </div>,

                        <div>
                            <Grid item xs={4}>
                                <Typography align="right" variant="body1">Full Name</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography align="right" variant="body1">{appointmentWrapper.walkInAppointment.patientFullName}</Typography>
                            </Grid>
                        </div>,

                        <div>
                            <Grid item xs={5}>
                                <Typography align="right" variant="body1">Appointed Doctor</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography align="right" variant="body1">{appointmentWrapper.appointedDoctor.fullName}</Typography>
                            </Grid>
                        </div>,

                        <div>
                            <Grid item xs={4}>
                                <Typography align="right" variant="body1">Your Number</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography align="right" variant="body1">{appointmentWrapper.walkInAppointment.appointmentNumber}</Typography>
                            </Grid>
                        </div>,

                        <div>
                                <Grid item xs={4}>
                                    <Typography align="right" variant="body1">Created At</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography align="right" variant="body1">{appointmentWrapper.walkInAppointment.createdAt}</Typography>
                                </Grid>
                        </div>,

                        <div>
                                <Grid item xs={4}>
                                    <Typography align="right" variant="body1">Clinic Room Id</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography align="right" variant="body1">{appointmentWrapper.appointedDoctor.clinicRoomId}</Typography>
                                </Grid>
                        </div>,

                        <div key={uuidv4()}>
                            <Grid item xs={6}>
                                <Typography align="right" variant="body1">Total Patients Visited</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" variant="body1">{appointmentWrapper.appointmentStatus.patientsInVisitedQueue}</Typography>
                            </Grid>
                        </div>

                    ].map((component,index) => <ListItem key={index}>{component}</ListItem>)
                }
                {/*<ListItem key={uuidv4()}>*/}
                {/*    <img alt={appointmentWrapper.qrCode.qrCodeName}*/}
                {/*        src={globalconstants.BASE_URL + '/' + appointmentWrapper.qrCode.qrCodeUrlPath} />*/}
                {/*</ListItem>*/}
                {/*<ListItem key={uuidv4()}>*/}
                {/*    <Grid item xs={4}>*/}
                {/*        <Typography align="right" variant="body1">Full Name</Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={8}>*/}
                {/*        <Typography align="right" variant="body1">{appointmentWrapper.walkInAppointment.patientFullName}</Typography>*/}
                {/*    </Grid>*/}
                {/*</ListItem>*/}
                {/*<ListItem key={uuidv4()}>*/}
                {/*    <Grid item xs={5}>*/}
                {/*        <Typography align="right" variant="body1">Appointed Doctor</Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={7}>*/}
                {/*        <Typography align="right" variant="body1">{appointmentWrapper.appointedDoctor.fullName}</Typography>*/}
                {/*    </Grid>*/}
                {/*</ListItem>*/}
                {/*<ListItem key={uuidv4()}>*/}
                {/*    <Grid item xs={4}>*/}
                {/*        <Typography align="right" variant="body1">Your Number</Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={8}>*/}
                {/*        <Typography align="right" variant="body1">{appointmentWrapper.walkInAppointment.appointmentNumber}</Typography>*/}
                {/*    </Grid>*/}
                {/*</ListItem>*/}
                {/*<ListItem key={uuidv4()}>*/}
                {/*    <Grid item xs={4}>*/}
                {/*        <Typography align="right" variant="body1">Created At</Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={8}>*/}
                {/*        <Typography align="right" variant="body1">{appointmentWrapper.walkInAppointment.createdAt}</Typography>*/}
                {/*    </Grid>*/}
                {/*</ListItem>*/}
                {/*<ListItem key={uuidv4()}>*/}
                {/*    <Grid item xs={4}>*/}
                {/*        <Typography align="right" variant="body1">Clinic Room Id</Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={8}>*/}
                {/*        <Typography align="right" variant="body1">{appointmentWrapper.appointedDoctor.clinicRoomId}</Typography>*/}
                {/*    </Grid>*/}
                {/*</ListItem>*/}
                {/*<ListItem key={uuidv4()}>*/}
                {/*    <Grid item xs={6}>*/}
                {/*        <Typography align="right" variant="body1">Total Patients Visited</Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={6}>*/}
                {/*        <Typography align="right" variant="body1">{appointmentWrapper.appointmentStatus.patientsInVisitedQueue}</Typography>*/}
                {/*    </Grid>*/}
                {/*</ListItem>*/}
            </List>
        </Paper>
    );
}