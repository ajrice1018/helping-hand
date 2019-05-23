import React, {Fragment, useState} from "react";
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";

import PropTypes from 'prop-types';

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '', password2: ''});


    const {firstName, lastName, email, password, password2} = formData;

    const onChange = e => {
       console.log( 
           formData)
        setFormData({

        ...formData,
        [e.target.name]: e.target.value
    })};

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({firstName, lastName, email, password});

        }
    };


    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/requestor-landing"/>
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
                <Link to="/login">Sign In</Link>
            </p>

        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated});
export default connect(mapStateToProps, {setAlert, register})(Register);