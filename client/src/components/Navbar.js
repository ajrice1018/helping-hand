import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Landing from './landing';
import RequestLandingPage from '../pages/RequestLanding';
import VolunteerLandingPage from '../pages/VolunteerLanding';
import FAQ from '../pages/FAQ';

const Navbar = () => {
    return (
        <Router>
            <div className="container">

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                    <Link to="/" className="navbar-brand">Helping Hands</Link>
                    <div className="collpase nav-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Chores</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Chore</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/map" className="nav-link">Map</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="nav-link">FAQ</Link>
                            </li>
                        </ul>
                    </div>
                </nav>


            <Route path="/" exact component={Landing}/>
            <Route path="/create" component={RequestLandingPage}/> 
            <Route path="/map" component={VolunteerLandingPage}/> 
            <Route path="/faq" component={FAQ}/>
            </div>

        </Router>
    )
}

export default Navbar;