import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';


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
                <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li>
                <Link to="/create" className="nav-link">Create Chore</Link>
            </li>
            <li>
                <Link to="/map" className="nav-link">Map</Link>
            </li>
            <li>
                <Link to='/profiles' className="nav-link">Profiles</Link>
            </li>
            <li>
                <Link to='/dashboard' className="nav-link">
                    <i className='fas fa-user'/>{' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to="/faq" className="nav-link">FAQ</Link>
            </li>
            <li>
                <a onClick={logout} href='/' className="nav-link">
                    <i className='fas fa-sign-out-alt'/>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li>
                <Link to='/profiles' className="nav-link">Profiles</Link>
            </li>
            <li>
                <Link to="/faq" className="nav-link">FAQ</Link>
            </li>
            {/* <li>
                <Link to='/login' className="nav-link">Login</Link>
            </li> */}
        </ul>
    );
    return (
        // <Router>
            <div className="container">

                <nav className='navbar bg-dark'>
                    <h1>
                        <Link to='/'>
                            Helping Hands
                        </Link>
                    </h1>
                    {!loading && (
                        <Fragment>{isAuthenticated
                                ? authLinks
                                : guestLinks}</Fragment>
                    )}
                </nav>

                {/* <Route path="/" exact component={Landing}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/create" component={RequestLandingPage}/>
                <Route path="/map" component={VolunteerLandingPage}/>
                <Route path="/faq" component={FAQ}/> */}
            </div>


    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps, {logout})(Navbar);