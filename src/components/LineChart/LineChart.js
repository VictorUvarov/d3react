import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "2014",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "2012",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(255, 0, 0, 0.6)",
      borderColor: "rgba(255, 0, 0, 0.6)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(255, 0, 0, 0.6)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(255, 0, 0, 0.6)",
      pointHoverBorderColor: "rgba(255, 0, 0, 0.6)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [40, 55, 56, 81, 80, 59, 65]
    },
    {
        label: "2010",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(64, 255, 0, 0.6)",
        borderColor: "rgba(64, 255, 0, 0.6)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(64, 255, 0, 0.6)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(64, 255, 0, 0.6)",
        pointHoverBorderColor: "rgba(64, 255, 0, 0.6)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [20,30,40,50,65,70,80]
      }
  ]
};

export default class LineChart extends Component {
  static defaultProps = {
    displayName: "LineExample"
  };
  render() {
    return (
      <div>
        <Line data={data} />
      </div>
    );
  }
}
