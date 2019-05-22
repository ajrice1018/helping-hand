import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Landing from './Landing';
import RequestLandingPage from '../../pages/RequestLanding';
import VolunteerLandingPage from '../../pages/VolunteerLanding';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import FAQ from '../../pages/FAQ';

const Navbar = ({
    auth: {
        isAuthenticated,
        loading
    },
    logout
}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/" className="nav-link">Chores</Link>
            </li>
            <li>
                <Link to="/create" className="nav-link">Create Chore</Link>
            </li>
            <li>
                <Link to="/map" className="nav-link">Map</Link>
            </li>
            <li>
                <Link to='/profiles'>Profiles</Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user'/>{' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt'/>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Profiles</Link>
            </li>
            <li>
                <Link to="/faq" className="nav-link">FAQ</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );
    return (
        <Router>
            <div className="container">

                <nav className='navbar bg-dark'>
                    <h1>
                        <Link to='/'>
                            <i className='fas fa-code'/>
                            DevConnector
                        </Link>
                    </h1>
                    {!loading && (
                        <Fragment>{isAuthenticated
                                ? authLinks
                                : guestLinks}</Fragment>
                    )}
                </nav>

                <Route path="/" exact component={Landing}/>
                <Route path="/create" component={RequestLandingPage}/>
                <Route path="/map" component={VolunteerLandingPage}/>
                <Route path="/faq" component={FAQ}/>
            </div>

        </Router>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps, {logout})(Navbar);