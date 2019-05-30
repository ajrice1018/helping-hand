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
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import SendMessage from './components/message-components/Send-Message';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';



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
                    <Navbar/> 
                        <Alert/>
                        <Switch>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/volunteer-register" component={VolunteerRegister}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/volunteer-login" component={VolunteerLogin}/>
                            <Route path="/" exact component={Home}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/create" component={RequestLandingPage}/>
                            <Route path="/map" component={VolunteerLandingPage}/>
                            <Route path="/faq" component={FAQ}/>
                            <Route path="/message/:id" component={SendMessage}/>
                            <Route path="/requestor-landing" component={RequestLandingPage}/>
                            <Route path="/volunteer-landing" component={VolunteerLandingPage}/>


                            <Route exact path='/profiles' render ={(props)=> <Profiles{...props}/>}/>
                            <Route exact path='/profile/:id' component={Profile} />
                            <PrivateRoute exact path='/dashboard' component={Dashboard} />
                            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                            <Route component={NotFound} />
                        </Switch>
                </Fragment>
            </Router>
        </Provider>
    )
};

export default App;
