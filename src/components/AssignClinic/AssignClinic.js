import React, {useEffect, useState} from 'react';
import * as globalconstants from '../../global-constants';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Snackbar,
    Typography
} from '@material-ui/core';

function AssignClinic() {

    const classes = globalconstants.useStyles();

    const [doctors, setDoctors] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [formData, setFormData] = useState({
        selectedDoctor: {},
        selectedClinicRoom: {}
    });

    const fetchDoctors = () => {
        fetch(globalconstants.API.fetchAllDoctors, {
            method: 'GET',
            headers: {
                'Authorization': globalconstants.accessToken()
            }
        })
        .then(response => response.json())
        .then(users => {
            console.log("List of doctors: ", doctors);
            setDoctors(users);
        });
    }

    const fetchClinics = () => {
        fetch(globalconstants.API.fetchAllClinics, {
            method: 'GET',
            headers: {
                'Authorization': globalconstants.accessToken()
            }
        })
        .then(response => response.json())
        .then(availableClinics => {
            console.log("List of available clinics: ", clinics);
            setClinics(availableClinics);
        });
    }

    useEffect(() => {
        fetchDoctors();
        fetchClinics();
    }, [])

    const handleChange = (name) => (e) => {
        let value = e.target.value;
        console.log("Selected Value: ", value);
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const showSnackbar = (message) => {
        setSnackbar({open: true, message: message});
        setTimeout(() => {
            setSnackbar({...snackbar, open: false});
        }, 6000)
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Assigning clinic to user", formData);
        fetch(globalconstants.BASE_URL + '/clinic/assign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': globalconstants.accessToken()
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(assignedUser => {
            console.log("Assigned User", assignedUser);
            showSnackbar("Successfully assigned Clinic to the doctor.");
        })
        .catch(error => {
            showSnackbar("There is some problem assigning clinic to the doctor.");
        })
        
    }

    const [snackbar, setSnackbar] = useState({open: false, message: '', })
    return (
        <Paper className={classes.root} style={{padding: 10}}>
            <Snackbar 
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom"
                }}
                autoHideDuration={6}
                message={snackbar.message}
                open={snackbar.open}
            />
            <Typography variant="h5">Assign Clinic to Doctor</Typography>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="selected-doctor">Select Doctor</InputLabel>
                    <Select fullWidth input={<OutlinedInput id="selected-doctor" name="selectedDoctor" />}
                        onChange={handleChange('selectedDoctor')}
                        value={formData.selectedDoctor}
                    >
                        <MenuItem disabled value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            doctors.map((user,index) => (
                                <MenuItem key={index} value={user}>{ user.fullName }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="selected-clinic-room">Select Clinic</InputLabel>
                    <Select fullWidth input={<OutlinedInput id="selected-clinic-room" name="selectedClinicRoom" />}
                        onChange={handleChange('selectedClinicRoom')}
                        value={formData.selectedClinicRoom}
                    >
                        <MenuItem disabled value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            clinics.map((clinic,index) => (
                                <MenuItem key={index} value={clinic}>{ clinic.name }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Button fullWidth variant="contained" color="primary" type="submit">
                        Assign Clinic
                    </Button>
                </FormControl>
            </form>
        </Paper>
    );

}


export default AssignClinic;