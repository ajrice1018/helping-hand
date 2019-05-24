// import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import React, {Fragment, useState} from "react";
import {Link, Redirect} from "react-router-dom";
// import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

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

const Login = ({login, isAuthenticated}) => {
    const [formData,
        setFormData] = useState({name: '', email: '', password: '', password2: ''});

    const {email, password} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    const classes = useStyles();

    // Redirect if loggedin
    if (isAuthenticated) {
        return <Redirect to="/requestor-landing"/>
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in as a Requestor
                </Typography>
                <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"/>
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={e => onChange(e)}
                                autoComplete="email"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                onChange={e => onChange(e)}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"/>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={< Checkbox value = "allowExtraEmails" color = "primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."/>
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Don't have an account?
                                <Link to="/register"> Sign Up!</Link>
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
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated});

export default connect(mapStateToProps, {login})(Login);