import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Searchbar from './Searchbar'
import Items from './Items'
import ItemDetails from './ItemDetails'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Searchbar/>
          <Route exact path="/items" component={Items}/>
          <Route exact path="/items/:id" component={ItemDetails}/>
        </div>
      </Router>
    );
  }
}

export default App;
