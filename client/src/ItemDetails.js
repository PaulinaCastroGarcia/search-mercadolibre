import React, { Component } from 'react';
import './App.css';
import Breadcrumb from './Breadcrumb'
import Price from "./Price";

class ItemDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      item: ''
    }
  }

  componentDidMount() {
    fetch('process.env.REACT_APP_API_BASE' + `/api/items/${this.props.match.params.id}`)
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
      return(
        <div className="loader-container">
          <p className="loader"></p>
        </div>
      )
    } 

    let decimal = ''
    if (this.state.item.price.decimals !== 0) {
      decimal = this.state.item.price.decimals
      if (this.state.item.price.decimals.toString().length === 1) {
        decimal = this.state.item.price.decimals.toString() + '0'
      }
    }

    return (
      <div className="item-details-container">
        <Breadcrumb categories={this.state.categories}/>
        
        <div className="item-details">
          <div className="item-details-description">
            <img src={this.state.item.picture} alt=""/>
            <h6>Descripcion del producto</h6>
            <p>{this.state.item.description !== '' ? this.state.item.description : 'El vendedor no incluyó una descripción del producto'}</p>
          </div>

          <div className="item-details-info">
            <p>
              {this.state.item.condition === 'new' ? 'Nuevo - ' : 'Usado - '}
              {this.state.item.sold_quantity} vendidos
            </p>
            <h3>{this.state.item.title}</h3>
            <div className="price">
              <Price price={this.state.item.price}/>
              <span className="decimals">{decimal}</span>
            </div>
            <button>Comprar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetails;
