import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import Navbar from './components/Navbar';
import './App.css';

class App extends Component {
    render() {
        return (

            <Router>
                <Navbar/>
            </Router>
        );
    }
}

export default App;
