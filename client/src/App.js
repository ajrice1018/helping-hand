import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';



class App extends Component {
  render() {
    return (

      <Router>
        <div className="container">

          <Navbar />
       

        </div>
      </Router>
    );
  }
}

export default App;
