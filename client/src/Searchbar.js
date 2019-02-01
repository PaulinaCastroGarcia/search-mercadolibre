import React, { Component } from 'react';
import logo from './logo.png';
import { Link } from "react-router-dom";
import {withRouter} from 'react-router'

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    
    this.seachIcon = "https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png"
  }

  render() {
    return (
      <div className="searchbar">
        <Link to="/"> <img className="logo" src={logo} alt="logo"/></Link>
        

        <form>
						<input 
              type="text"
              placeholder="what are you looking for?"
              value={this.state.search}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}>
            </input>

            <Link to={`/items?search=${this.state.search}`}>
              <button>
                <img src={this.seachIcon} alt="search icon"/>
              </button>
            </Link>
					</form>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  handleKeyDown = (e) =>{
    if (e.keyCode === 13) {
      this.props.history.push(`/items?search=${this.state.search}`)
    }
  }
}

export default withRouter(Searchbar);
