import React, { Component } from "react";
import ReactDOM from "react-dom";
import Chart from "./app/chart/chartComponent";
import Header from "./app/header/headerComponent";
import Footer from "./app/footer/footerComponent";
import NavBar from "./app/navBar/navBarComponent";
import "./index.scss";
class AppComponent extends Component {
  render() {
    return (
      <div>
        <Header />
        <div class="inherit-height">
          <NavBar name="Nav Bar" />
          <Chart />
        </div>
        <Footer />
      </div>
    );
  }
}

var appNode = document.getElementById("app");
ReactDOM.render(<AppComponent />, appNode);
