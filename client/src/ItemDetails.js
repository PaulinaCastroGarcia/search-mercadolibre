import React, { Component } from 'react';
import './App.css';
import Breadcrumb from './Breadcrumb'


class ItemDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      item: ''
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3001/api/items/${this.props.match.params.id}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        categories: data.categories,
        item: data.item
      })
    })
  }

  render() {
    if (this.state.item === '') {
      return <p>loading...</p>
    } 

    return (
      <div className="item-details">
        <Breadcrumb categories={this.state.categories}/>
        {/* <img src={this.state.item.picture} alt=""/>
        {this.state.item.condition}
        {this.state.item.sold_quantity}
        { this.state.item.free_shipping && <i className="fas fa-truck"></i> }
        {this.state.item.title}
        {this.state.item.price.currency}
        {this.state.item.price.amount}
        {this.state.item.price.decimals}
        {this.state.item.description} */}
      </div>
    );
  }
}

export default ItemDetails;
