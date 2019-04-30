import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import dummyData from "../../data/power_outages_year";

export default class PieChart extends Component {
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
      year: props.data[0].year,
      screenWidth: props.screenSize[0],
      screenHeight: props.screenSize[1]
    };
  }

  render() {
    const { data } = this.state;

    let chartData = data.filter(d => {
      return d.year === this.state.year;
    });

    console.log(chartData);

    // TODO: Map data to visualization
    // labels: [description]
    // data : [numCustomersAffected]
    // backgroundColor: [random]

    if (data === null) {
      return <div>loading...</div>;
    }

    return (
      <div>
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
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                bottom: 50,
                top: 100
              }
            }
          }}
        />
      </div>
    );
  }
}
