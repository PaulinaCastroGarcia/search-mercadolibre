import React, { Component } from 'react';
import Item from './Item'

class Items extends Component {
  constructor(props) {
    super(props)

    this.state = {
      category: '',
      items: []
    }
  }

  apiCall() {
    const params = new URLSearchParams(window.location.search);
    this.search = params.get('search');

    if (this.lastSearch === this.search) return

    this.lastSearch = this.search
    
    fetch(process.env.REACT_APP_API_BASE + `/api/items?q=${this.search}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        category: data.category,
        items: data.items
      })
    })
  }

  componentDidMount() {
    this.apiCall()
  }

  componentDidUpdate() {
    this.apiCall()
  }

  render() {
    let items = this.state.items
    this.items = items.map((p,i) => <Item key={i} p={p}/>)

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
