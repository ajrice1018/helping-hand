import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import CreateChore from "./components/create-chore.component";
import EditChore from "./components/edit-chore.component";
import ChoresList from "./components/chores-list.component";
import Map from './components/Maps.js';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
            <Link to="/" className="navbar-brand">MERN-Stack Chore App</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Chores</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Chore</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/Map" className="nav-link">Map</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={ChoresList} />
          <Route path="/edit/:id" component={EditChore} />
          <Route path="/create" component={CreateChore} />
          <Route path="/map" component={Map}/>
        </div>
      </Router>
    );
  }
}

export default App;
