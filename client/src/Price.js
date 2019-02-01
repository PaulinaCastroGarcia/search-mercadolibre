import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class Price extends Component {
  amount = this.props.price.amount
  decimals = this.props.price.decimals
  
  render() {
    return (
      <NumberFormat 
        value={this.amount} 
        displayType={'text'} 
        thousandSeparator={'.'}
        decimalSeparator={','}
        prefix={this.props.price.currency === 'ARS' && '$ '}
      />
    );
  }
}

export default Price;
