import React, { Component } from "react";
import ReactDOM from "react-dom";
import Chart from "./app/chart/chartComponent";
import Header from "./app/header/headerComponent";
import Footer from "./app/footer/footerComponent";
import NavBar from "./app/navBar/navBarComponent";
import "./index.scss";
class AppComponent extends Component {
  state = {
    stocks: [
      {
        name: "MSFT",
        data: {}
      },
      {
        name: "AAPL",
        data: {}
      },
      {
        name: "INTC",
        data: {}
      },
      {
        name: "NFLX",
        data: {}
      }
    ],
    selected: {
      name: "MSFT",
      data: {}
    }
  };
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  handleClick = stock => {
    if (stock && this.isEmpty(stock.data)) {
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
          stock.name
        }&apikey=P9IGU7IHUBXUBTLT`
      )
        .then(response => response.json())
        .then(data => {
          let stocks = [...this.state.stocks];
          let index = this.state.stocks.indexOf(stock);
          stocks[index].data = data;
          let selected = stocks[index];
          this.setState({ stocks: stocks, selected: selected });
        });
    }
  };
  render() {
    return (
      <div>
        <Header />
        <div className="inherit-height">
          <NavBar stocks={this.state.stocks} handleClick={this.handleClick} />
          <Chart stock={this.state.selected} />
        </div>
        <Footer />
      </div>
    );
  }
}

var appNode = document.getElementById("app");
ReactDOM.render(<AppComponent />, appNode);
