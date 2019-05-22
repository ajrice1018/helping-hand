import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux';

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div class="landing-inner">
                    <h1 class="x-large">Helping Hand</h1>
                    <p class="lead">
                        Welcome!
                    </p>
                    <div class="buttons">
                        <Link to="/volunteer-register" className="btn btn-primary">Volunteers</Link>
                        <Link to="/register" className="btn btn-light">Requesters</Link>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Landing;