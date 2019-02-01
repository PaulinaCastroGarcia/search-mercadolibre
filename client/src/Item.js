import React, { Component } from 'react';
import { Link } from "react-router-dom";
import freeShippingIcon from './free-shipping-icon.png';
import Price from "./Price";

class Item extends Component {
  render() {
    let decimal = ''
    if (this.props.p.price.decimals !== 0) {
      decimal = this.props.p.price.decimals
      if (this.props.p.price.decimals.toString().length === 1) {
        decimal = this.props.p.price.decimals.toString() + '0'
      }
    }

    return (
      <Link to={`/items/${this.props.p.id}`}>
        <div className="item">
          <div className="img-container">
            <img src={this.props.p.picture} alt="product"/>
          </div>

          <div className="item-info">
            <div className="price">
              <Price price={this.props.p.price}/>
              <span className="decimals">{decimal}</span>
            </div>
            {this.props.p.free_shipping && <img src={freeShippingIcon} alt="free shipping icon"/>}
            <p>{this.props.p.title}</p>
          </div>

          <p className="item-location">{this.props.p.location}</p>
        </div>
      </Link>
    );
  }
}

export default Item;