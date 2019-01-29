import React, { Component } from 'react';
import './App.css';
import Item from './Item'


class Items extends Component {
  constructor(props) {
    super(props)

    this.state = {
      category: '',
      items: []
    }
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    this.search = params.get('search');
    
    fetch(`http://localhost:3001/api/items?q=${this.search}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        category: data.category,
        items: data.items
      })
    })
  }

  componentDidUpdate() {
    let params = new URLSearchParams(window.location.search);
    this.search = params.get('search');
    
    fetch(`http://localhost:3001/api/items?q=${this.search}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        category: data.category,
        items: data.items
      })

      let items = this.state.items
      this.items = items.map((p,i) => <Item key={i} p={p}/>)
    })
  }

  render() {
    return (
      <div className="items">
        <p className="category">{this.state.category}</p>
        <div className="items-container">
          {this.items}
        </div>
      </div>
    );
  }
}

export default Items;
