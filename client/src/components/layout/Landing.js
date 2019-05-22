import React from "react";

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div class="landing-inner">
                    <h1 class="x-large">Developer Connector</h1>
                    <p class="lead">
                        Create a developer profile/portfolio, share posts and get help from other
                        developers
                    </p>
                    <div class="buttons">
                        <a href="register" className="btn btn-primary">Sign Up</a>
                        <a href="login" className="btn btn-light">Login</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing;