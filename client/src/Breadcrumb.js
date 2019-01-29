import React, { Component } from 'react';
import './App.css';

class Breadcrumb extends Component {
  render() {
    categories = this.props.categories
    let categories = categories.map((c) => <li>{c}</li>)
    return (
      <ul className="category">
        {categories}
      </ul>
    );
  }
}

export default Breadcrumb;