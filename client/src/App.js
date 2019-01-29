import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Searchbar from './Searchbar'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Searchbar/>
          {/* <Route path="/items" component={Items}/> */}
          {/* <Route path="/items/:id" component={ItemDetails}/> */}
        </div>
      </Router>
    );
  }
}

export default App;
