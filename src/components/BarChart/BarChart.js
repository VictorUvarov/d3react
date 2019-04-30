import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

const dummyData = {
  labels: [
    "Boston",
    "Worcester",
    "Springfield",
    "Lowell",
    "Cambridge",
    "New Bedford"
  ],
  datasets: [
    {
      label: "Population",
      data: [617594, 181045, 153060, 106519, 105162, 95072],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)"
      ]
    },
    {
      label: "Population",
      data: [617594, 181045, 153060, 106519, 105162, 95072],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)"
      ]
    }
  ]
};

export default class BarChart extends Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom",
    title: "Title"
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      year: props.data[0].year
    };
  }

  render() {
    const { data } = this.state;

    let descriptions = new Set();
    let dataSets = [];

    let chartData = data.filter(d => {
      return d.year === this.state.year;
    });

    chartData.forEach(d => {
      descriptions.add(d.description);
    });

    // TODO: Map data to visualization
    // labels: [description]
    // data : [numCustomersAffected]
    // backgroundColor: 


    if (data === null) {
      return <div>loading...</div>;
    }
    return (
      <div className="bar-chart">
        <Bar
          data={dummyData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: this.props.title + " (" + this.state.year + ")",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
        <Line
          data={dummyData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: this.props.title + " (" + this.state.year + ")",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
        <Pie
          data={dummyData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: this.props.title + " (" + this.state.year + ")",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}
