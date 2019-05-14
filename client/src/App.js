import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import CreateChore from "./components/create-chore.component";
import EditChore from "./components/edit-chore.component";
import ChoresList from "./components/chores-list.component";
import MapView from './pages/MapView';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';



class App extends Component {
  render() {
    return (

      <Router>
        <div className="container">
          <Navbar />
          <Landing />
          {/* <Route path="/" exact component={ChoresList} />
          <Route path="/edit/:id" component={EditChore} />
          <Route path="/create" component={CreateChore} />
          <Route path="/map" component={MapView}/> */}
        </div>
      </Router>
    );
  }
}

export default App;
