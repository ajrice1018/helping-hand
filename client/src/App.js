import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import VolunteerRegister from './components/auth/VolunteerRegister';
import Login from './components/auth/Login';
import VolunteerLogin from './components/auth/VolunteerLogin';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import RequestLandingPage from './pages/RequestLanding';
import VolunteerLandingPage from './pages/VolunteerLanding';
import FAQ from './pages/FAQ';
import SendMessage from './components/message-components/Send-Message';


// REDUX
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';

import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar/> {/* <Route exact path="/" component={Landing}/> */}
                    <section className="container">
                        <Alert/>
                        <Switch>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/volunteer-register" component={VolunteerRegister}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/volunteer-login" component={VolunteerLogin}/>
                            <Route path="/" exact component={Landing}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/create" component={RequestLandingPage}/>
                            <Route path="/map" component={VolunteerLandingPage}/>
                            <Route path="/faq" component={FAQ}/>
                            <Route path="/message/:id" component={SendMessage}/>
                            <Route path="/requestor-landing" component={RequestLandingPage}/>
                            <Route path="/volunteer-landing" component={VolunteerLandingPage}/>
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    )
};

export default App;
