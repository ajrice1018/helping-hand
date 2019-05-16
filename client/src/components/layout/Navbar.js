import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateChore from "../create-chore.component";
import EditChore from "../edit-chore.component";
import ChoresList from "../chores-list.component";
import MapView from '../../pages/MapView';


const Navbar = () => {
    return (
        <Router>
        <div className="container">

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            
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
              <Link to="/map" className="nav-link">Map</Link>
            </li>
          </ul>
        </div>
      </nav>

      </div>

      <Route path="/" exact component={ChoresList} />
          <Route path="/edit/:id" component={EditChore} />
          <Route path="/create" component={CreateChore} />
          <Route path="/map" component={MapView}/> 

      </Router>
    )
}

export default Navbar;