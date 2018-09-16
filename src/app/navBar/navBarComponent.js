import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./navBar.scss";
class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        {this.props.stocks.map(stock => {
          return (
            <div
              className="nav-item"
              key={stock.name}
              onClick={() => {
                this.props.handleClick(stock);
              }}
            >
              {stock.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default NavBar;
