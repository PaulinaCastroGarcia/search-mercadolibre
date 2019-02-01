import React, { Component } from 'react';
import './App.css';

class Breadcrumb extends Component {
  render() {
    let categories = this.props.categories
    categories = categories.map((c,i) => <li key={i}>{c}</li>)
    
    return (
      <ul className="category">
        {categories}
      </ul>
    );
  }
}

export default Breadcrumb;