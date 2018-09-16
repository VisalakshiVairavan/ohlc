import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./chart.scss";
class Chart extends Component {
  render() {
    return (
      <div className="chart">
        <canvas />
      </div>
    );
  }
}

export default Chart;
