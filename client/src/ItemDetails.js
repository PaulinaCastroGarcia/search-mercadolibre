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
    let freeShippingIcon
    if (this.state.item.free_shipping) {
      freeShippingIcon = <i className="fas fa-truck"></i>
    }

    if (this.state.item === '') {
      return <p>loading...</p>
    } 

    return (
      <div className="item-details-container">
        <Breadcrumb categories={this.state.categories}/>
        <div className="item-details">
          <div className="item-details-description">
            <img src={this.state.item.picture} alt=""/>
            <h6>Descripcion del producto</h6>
            <p>{this.state.item.description}</p>
          </div>
          <div className="item-details-info">
            <p>{this.state.item.condition} - {this.state.item.sold_quantity} vendidos {freeShippingIcon}
            </p>
            <h3>{this.state.item.title}</h3>
            <h4>{this.state.item.price.currency} {this.state.item.price.amount}{this.state.item.price.decimals}</h4>
            <button>Comprar</button>
          </div>
        </div>
        
        
      </div>
    );
  }
}

export default ItemDetails;
