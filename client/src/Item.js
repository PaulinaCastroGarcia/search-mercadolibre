import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";

class Item extends Component {
  render() {
    return (
      <Link to={`/items/${this.props.p.id}`}>
        <div className="item">
          <img src={this.props.p.picture} alt="product"/>

          <div className="item-info">
            <span>
              {this.props.p.price.currency === 'ARS' && '$'}
              {this.props.p.price.amount}
              {/* {this.props.p.price.decimals} */}
            </span>
            <p>{this.props.p.title}</p>
          </div>

          <p className="item-location">{this.props.p.location}</p>
        </div>
      </Link>
    );
  }
}

export default Item;