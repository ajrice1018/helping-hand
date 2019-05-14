import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
                        <a href="register.html" className="btn btn-primary">Sign Up</a>
                        <a href="login.html" className="btn btn-light">Login</a>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default Landing;