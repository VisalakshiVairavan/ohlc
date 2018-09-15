import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./navBar.scss";
class NavBar extends Component {
  render() {
    return <div class="nav-bar">{this.props.name}</div>;
  }
}

export default NavBar;
