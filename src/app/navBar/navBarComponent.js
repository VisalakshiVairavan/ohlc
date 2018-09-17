import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./navBar.scss";
class NavBar extends Component {
  getClassName = (stock, selected) => {
    let className = "nav-item ";
    if (stock.name === selected.name) {
      className += "nav-item-selected";
    }
    return className;
  };

  render() {
    return (
      <div className="nav-bar">
        {this.props.stocks.map(stock => {
          return (
            <div
              className={this.getClassName(stock, this.props.selected)}
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
