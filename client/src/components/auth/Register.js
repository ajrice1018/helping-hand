import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import React, {Fragment, useState} from "react";
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";

import PropTypes from 'prop-types';

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Built with love by the '}
            {/* <Link color="inherit" href="https://material-ui.com/">
                Material-UI
            </Link> */}
            {' team.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));


const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData,
        setFormData] = useState({firstName: '', lastName: '', email: '', password: '', password2: ''});

    const {firstName, lastName, email, password, password2} = formData;

    const onChange = e => {
        console.log(formData)
        setFormData({

            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({firstName, lastName, email, password});

        }
    };

    const classes = useStyles();

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/requestor-landing"/>
    }

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <img className="register-hand" src="hand-req.svg" alt="hand icon"></img>
                <Typography component="h1" variant="h5">
                    Register as a Requestor
                </Typography>
                <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField type="text" // placeholder="First Name" 
                                // name="firstName" 
                                value={firstName} onChange={e => onChange(e)} // required  
                                autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField type="text" // placeholder="Last Name" 
                                // name="lastName" 
                                value={lastName} onChange={e => onChange(e)} // required   
                                variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="email" // placeholder="Email Address" 
                                // name="email" 
                                value={email} onChange={e => onChange(e)} // required
                                variant="outlined" required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" // placeholder="Password" 
                                // name="password" 
                                minLength="6" onChange={e => onChange(e)} // required
                                variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" // placeholder="Password" 
                                // name="password" 
                                minLength="6" onChange={e => onChange(e)} // required
                                variant="outlined" required fullWidth name="password2" label="Password" type="password2" id="password2" autoComplete="current-password"/>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                            Already have an account? <Link to="/login"> Sign In!</Link>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <MadeWithLove/>
            </Box>
        </Container>
    );

};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated});
export default connect(mapStateToProps, {setAlert, register})(Register);