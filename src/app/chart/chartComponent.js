import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./chart.scss";
class Chart extends Component {
  state = {
    fieldName: "Time Series (Daily)"
  };

  xUnit = 30;
  yUnit = 50;
  maxheight = 500;
  maxWidth = 900;
  margin = 40;
  redStroke = "red";
  greenStroke = "green";
  scaleUnit = 10;

  drawchart = () => {
    if (this.props.stock.data && this.props.stock.data[this.state.fieldName]) {
      // Copy the data into an array
      let timeObjects = Object.keys(this.props.stock.data[this.state.fieldName])
        .sort(this.sortDate)
        .map(k => this.props.stock.data[this.state.fieldName][k]);
      let chartDiv = document.getElementById("chart-canvas");
      let canvas = document.getElementById("chart-canvas");
      let c = canvas.getContext("2d");
      let currentX = this.margin;
      let { min, max } = this.findMinMax(timeObjects);

      canvas.height = this.maxheight = chartDiv.clientHeight - this.margin;
      canvas.width = this.maxWidth = chartDiv.clientWidth - this.margin;
      this.xUnit = Math.floor(canvas.width / 120); // for 120  days
      this.yUnit = Math.floor(canvas.height / (max - min));

      if (max - min > 400) {
        this.scaleUnit = 40;
      } else {
        this.scaleUnit = 10;
      }
      c.clearRect(0, 0, this.maxheight, this.maxWidth);
      this.drawAxis(c, min, max);

      timeObjects.forEach(object => {
        currentX += this.xUnit;
        this.drawDataPoints(c, object, currentX, min);
      });
    }
  };

  sortDate(a, b) {
    if (new Date(a) > new Date(b)) {
      return 1;
    }
    return -1;
  }
  // Find the range of values to be plotted
  findMinMax = timeObjects => {
    let minLow = 9999;
    let maxHight = 0;

    timeObjects.forEach(object => {
      if (object["3. low"] < minLow) {
        minLow = object["3. low"];
      }
      if (object["2. high"] > maxHight) {
        maxHight = object["2. high"];
      }
    });

    return {
      min: Math.floor(minLow / 10) * 10 - 25,
      max: Math.floor(maxHight / 10) * 10 + 25
    };
  };

  drawAxis = (c, min, max) => {
    c.beginPath();
    c.moveTo(this.margin, this.margin);
    c.lineTo(this.margin, this.maxheight - this.margin);
    c.lineTo(this.maxWidth - this.margin, this.maxheight - this.margin);
    c.stroke();
    // scales in y axis
    for (
      let i = this.margin, j = 0;
      i < this.maxheight - this.margin;
      i += this.yUnit, j += 1
    ) {
      c.fillRect(this.margin - 2, i, 2, 2);
      if (j % this.scaleUnit === 0) {
        c.fillText(max - j, this.margin - 30, i + 5);
      }
    }
    // scales in x axis
    for (
      let i = this.margin;
      i < this.maxWidth - this.margin;
      i += this.xUnit
    ) {
      c.fillRect(i, this.maxheight - this.margin, 2, 2);
    }
  };

  drawDataPoints = (c, timeObject, currentX, min) => {
    c.beginPath();
    c.moveTo(
      currentX,
      this.maxheight - (timeObject["3. low"] - min) * this.yUnit
    );
    c.lineTo(
      currentX,
      this.maxheight - (timeObject["2. high"] - min) * this.yUnit
    );
    if (timeObject["1. open"] < timeObject["4. close"]) {
      // Bullish
      c.strokeStyle = this.greenStroke;
      c.fillStyle = this.greenStroke;
    } else {
      //Bearish
      c.strokeStyle = this.redStroke;
      c.fillStyle = this.redStroke;
    }

    c.fillRect(
      currentX - 4,
      this.maxheight - (timeObject["1. open"] - min) * this.yUnit,
      4,
      2
    );
    c.fillRect(
      currentX + 1,
      this.maxheight - (timeObject["4. close"] - min) * this.yUnit,
      4,
      2
    );
    c.stroke();
  };

  render() {
    return (
      <div className="chart">
        <canvas id="chart-canvas" drawchart={this.drawchart()} />
      </div>
    );
  }
}

export default Chart;
