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
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import {setAlert} from "../../actions/alert";
import {registerVolunteer} from "../../actions/auth";

import PropTypes from 'prop-types';

const VolunteerRegister = ({setAlert, registerVolunteer, isAuthenticated}) => {
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '', password2: ''});


    const {firstName, lastName, email, password, password2} = formData;

    const onChange = e => {
        setFormData({

        ...formData,
        [e.target.name]: e.target.value
    })};

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            registerVolunteer({firstName, lastName, email, password});

        }
    };


    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/volunteer-landing"/>
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={e => onChange(e)} // required      
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={e => onChange(e)} // required      
                    />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} // required
                    />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" minLength="6" onChange={e => onChange(e)} // required
                    />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="password2" minLength="6" onChange={e => onChange(e)} // required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account?
                <Link to="/volunteer-login">Sign In</Link>
            </p>

        </Fragment>
    )
};

VolunteerRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerVolunteer: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated});
export default connect(mapStateToProps, {setAlert, registerVolunteer})(VolunteerRegister);